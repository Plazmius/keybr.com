import { type ReactNode } from "react";
import {
  type FocusProps,
  type KeyboardProps,
  type MouseProps,
} from "../props.ts";
import { type ClassName } from "../types.ts";

export type CheckBoxProps = {
  readonly checked?: boolean;
  readonly children?: ReactNode;
  readonly className?: ClassName;
  readonly label?: ReactNode;
  readonly name?: string;
  readonly title?: string;
  readonly value?: string;
  readonly onChange?: (checked: boolean) => void;
} & FocusProps &
  MouseProps &
  KeyboardProps;
