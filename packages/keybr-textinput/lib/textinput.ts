import { type TextInputSettings } from "@keybr/textinput-settings";
import { toCodePoints } from "@keybr/unicode";
import { normalize } from "./normalize.ts";
import {
  attrCursor,
  attrGarbage,
  attrHit,
  attrMiss,
  attrNormal,
  type Char,
  Feedback,
  type InputEvent,
  type Step,
} from "./types.ts";

export type StepListener = (step: Step) => void;

export class TextInput {
  public readonly text: string;
  public readonly codePoints: readonly number[];
  public readonly stopOnError: boolean;
  public readonly forgiveErrors: boolean;
  public readonly recoverSequenceLength: number;
  public readonly garbageSequenceLength: number;
  private readonly onStep: StepListener;
  private inputEvents: InputEvent[] = [];
  private steps: Step[] = [];
  private garbage: Step[] = [];
  private typo: boolean = false;

  constructor(
    text: string,
    { stopOnError, forgiveErrors }: TextInputSettings,
    onStep: StepListener = () => {},
  ) {
    this.text = text; // TODO Normalize?
    this.codePoints = [...toCodePoints(text)];
    this.stopOnError = stopOnError;
    this.forgiveErrors = forgiveErrors;
    this.recoverSequenceLength = 3;
    this.garbageSequenceLength = 10;
    this.onStep = onStep;
    this.reset();
  }

  reset(): void {
    this.inputEvents = [];
    this.steps = [];
    this.garbage = [];
    this.typo = false;
  }

  get completed(): boolean {
    return this.steps.length === this.codePoints.length;
  }

  step(codePoint: number, timeStamp: number): Feedback {
    if (this.completed) {
      // Cannot enter any more characters if already completed.
      throw new Error();
    }

    const expectedCodePoint = this.codePoints[this.steps.length];

    // Handle whitespace at the beginning of text.
    if (
      this.steps.length === 0 &&
      this.garbage.length === 0 &&
      !this.typo &&
      codePoint <= 0x20
    ) {
      return Feedback.Succeeded;
    }

    this.inputEvents.push({ codePoint, timeStamp });

    // Handle the delete key.
    if (codePoint === 0x08) {
      if (this.garbage.length > 0) {
        this.garbage.pop();
        return Feedback.Succeeded;
      } else {
        return Feedback.Failed;
      }
    }

    // Handle input.
    if (
      normalize(expectedCodePoint) === normalize(codePoint) &&
      (this.forgiveErrors || this.garbage.length === 0)
    ) {
      this.addStep({
        codePoint: expectedCodePoint,
        timeStamp,
        typo: this.typo,
      });
      this.garbage = [];
      if (this.typo) {
        this.typo = false;
        return Feedback.Recovered;
      } else {
        return Feedback.Succeeded;
      }
    }

    // Handle incorrect input.
    this.typo = true;
    if (!this.stopOnError || this.forgiveErrors) {
      if (this.garbage.length < this.garbageSequenceLength) {
        this.garbage.push({ codePoint, timeStamp, typo: false });
      }
    }
    if (this.forgiveErrors) {
      if (
        this.recoverFromReplacedCharacter() ||
        this.recoverFromSkippedCharacter()
      ) {
        this.typo = false;
        return Feedback.Recovered;
      }
    }
    return Feedback.Failed;
  }

  getInputEvents(): readonly InputEvent[] {
    return this.inputEvents;
  }

  getSteps(): readonly Step[] {
    return this.steps;
  }

  getChars(): readonly Char[] {
    const { codePoints, steps, garbage } = this;
    const chars: Char[] = [];
    for (let i = 0; i < codePoints.length; i++) {
      const codePoint = codePoints[i];
      if (i < steps.length) {
        // Append characters before cursor.
        const step = steps[i];
        chars.push(toChar(codePoint, step.typo ? attrMiss : attrHit));
      } else if (i === steps.length) {
        if (!this.stopOnError) {
          // Append buffered garbage.
          for (const { codePoint } of garbage) {
            chars.push(toChar(codePoint, attrGarbage));
          }
        }
        // Append character at cursor.
        chars.push(toChar(codePoint, attrCursor));
      } else {
        // Append characters after cursor.
        chars.push(toChar(codePoint, attrNormal));
      }
    }
    return chars;
  }

  private addStep(step: Step): void {
    this.steps.push(step);
    this.onStep(step);
  }

  private recoverFromReplacedCharacter(): boolean {
    // text:    abcd
    // garbage: xbcd
    // offset:  0

    // Check if the buffer size is right.
    if (
      this.garbage.length < this.recoverSequenceLength + 1 ||
      this.steps.length + this.recoverSequenceLength + 1 >
        this.codePoints.length
    ) {
      return false;
    }

    // Check if can recover.
    for (let i = 0; i < this.recoverSequenceLength; i++) {
      const codePoint = this.codePoints[this.steps.length + i + 1];
      if (codePoint !== this.garbage[i + 1].codePoint) {
        return false;
      }
    }

    // Append step with error.
    this.addStep({
      codePoint: this.codePoints[this.steps.length],
      timeStamp: this.garbage[0].timeStamp,
      typo: true,
    });

    // Append successful steps.
    for (let i = 1; i < this.garbage.length; i++) {
      const { codePoint, timeStamp } = this.garbage[i];
      this.addStep({
        codePoint,
        timeStamp,
        typo: false,
      });
    }

    this.garbage = [];
    return true;
  }

  private recoverFromSkippedCharacter(): boolean {
    // text:    abcd
    // garbage: bcd
    // offset:  0

    // Check if the buffer size is right.
    if (
      this.garbage.length < this.recoverSequenceLength ||
      this.steps.length + this.recoverSequenceLength + 1 >
        this.codePoints.length
    ) {
      return false;
    }

    // Check if can recover.
    for (let i = 0; i < this.recoverSequenceLength; i++) {
      const codePoint = this.codePoints[this.steps.length + i + 1];
      if (codePoint !== this.garbage[i].codePoint) {
        return false;
      }
    }

    // Append step with error.
    this.addStep({
      codePoint: this.codePoints[this.steps.length],
      timeStamp: this.garbage[0].timeStamp,
      typo: true,
    });

    // Append successful steps.
    for (let i = 0; i < this.garbage.length; i++) {
      const { codePoint, timeStamp } = this.garbage[i];
      this.addStep({
        codePoint,
        timeStamp,
        typo: false,
      });
    }

    this.garbage = [];
    return true;
  }
}

const charCache = new Map<number, Char>();

function toChar(codePoint: number, attrs: number): Char {
  const key = (codePoint & 0x00ff_ffff) | ((attrs & 0x0000_00ff) << 24);
  let char = charCache.get(key);
  if (char == null) {
    charCache.set(key, (char = { codePoint, attrs }));
  }
  return char;
}