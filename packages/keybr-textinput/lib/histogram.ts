import { type Sample, type Step } from "./types.ts";

export class Histogram implements Iterable<Sample> {
  static readonly empty = Histogram.from([]);

  readonly #map: Map<number, Sample>;

  constructor(samples: readonly Sample[]) {
    this.#map = new Map(
      Array.from(samples)
        .sort((a, b) => a.codePoint - b.codePoint)
        .map((sample) => [sample.codePoint, sample]),
    );
  }

  [Symbol.iterator](): IterableIterator<Sample> {
    return this.#map.values();
  }

  get complexity(): number {
    return this.#map.size;
  }

  has(codePoint: number): boolean {
    return this.#map.has(codePoint);
  }

  get(codePoint: number): Sample | null {
    return this.#map.get(codePoint) ?? null;
  }

  static from(
    steps: readonly Step[],
    {
      startedAt = null,
    }: {
      readonly startedAt?: number | null;
    } = {},
  ): Histogram {
    type MutableSample = {
      hitCount: number;
      missCount: number;
      timeToType: number[];
    };

    const samples = new Map<number, MutableSample>();
    let last: Step | null =
      startedAt != null
        ? { codePoint: 0, timeStamp: startedAt, typo: false }
        : null;
    for (const step of steps) {
      let sample = samples.get(step.codePoint);
      if (sample == null) {
        samples.set(
          step.codePoint,
          (sample = { hitCount: 0, missCount: 0, timeToType: [] }),
        );
      }
      sample.hitCount += 1;
      if (step.typo) {
        sample.missCount += 1;
      } else if (last != null) {
        sample.timeToType.push(step.timeStamp - last.timeStamp);
      }
      last = step;
    }
    return new Histogram(
      [...samples.entries()].map(
        ([codePoint, { hitCount, missCount, timeToType }]) => ({
          codePoint,
          hitCount,
          missCount,
          timeToType: Math.round(average(timeToType)),
        }),
      ),
    );
  }
}

function average(list: readonly number[]): number {
  let sum = 0;
  let count = 0;
  for (const v of list) {
    if (v > 0) {
      sum += v;
      count += 1;
    }
  }
  if (count > 0) {
    return sum / count;
  } else {
    return 0;
  }
}
