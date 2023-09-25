export const attrNormal = 0 as number;
export const attrHit = 1 as number;
export const attrMiss = 2 as number;
export const attrGarbage = 4 as number;
export const attrCursor = 8 as number;

export type Fragment = {
  readonly chars: readonly Char[];
};

export type Step = {
  readonly codePoint: number;
  readonly timeStamp: number;
  readonly typo: boolean;
};

export type Char = {
  readonly codePoint: number;
  readonly attrs: number;
};

export type LineData = {
  /** Line chars. */
  readonly chars: readonly Char[];
  /** Unique line identifier. */
  readonly key: number | string;
};

export type InputEvent = {
  readonly codePoint: number;
  readonly timeStamp: number;
};

export enum Feedback {
  Succeeded,
  Recovered,
  Failed,
}

export type Sample = {
  readonly codePoint: number;
  readonly hitCount: number;
  readonly missCount: number;
  readonly timeToType: number;
};
