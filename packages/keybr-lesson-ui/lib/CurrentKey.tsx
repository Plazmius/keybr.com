import { type LessonKeys } from "@keybr/lesson";
import { type ClassName } from "@keybr/widget";
import { clsx } from "clsx";
import { type ReactNode } from "react";
import * as styles from "./CurrentKey.module.less";
import { Key } from "./Key.tsx";
import { KeyDetails } from "./KeyDetails.tsx";

export const CurrentKey = ({
  id,
  className,
  lessonKeys,
}: {
  readonly id?: string;
  readonly className?: ClassName;
  readonly lessonKeys: LessonKeys;
}): ReactNode => {
  const boostedKey = lessonKeys.findBoostedKey();
  if (boostedKey != null) {
    return (
      <span
        id={id}
        className={clsx(styles.currentKey, styles.nonEmpty, className)}
      >
        <Key lessonKey={boostedKey} /> <KeyDetails lessonKey={boostedKey} />
      </span>
    );
  } else {
    return (
      <span
        id={id}
        className={clsx(styles.currentKey, styles.empty, className)}
      >
        <span>No Key</span>
      </span>
    );
  }
};
