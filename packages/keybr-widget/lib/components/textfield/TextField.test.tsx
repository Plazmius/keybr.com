import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import test from "ava";
import { Component, type ReactNode } from "react";
import { TextField } from "./TextField.tsx";

test.serial("props", (t) => {
  const r = render(<TextField value="abc" />);
  const element = r.getByRole("textbox") as HTMLInputElement;

  t.is(element.value, "abc");

  r.rerender(<TextField value="xyz" />);

  t.is(element.value, "xyz");

  r.unmount();
});

test.serial("controlled", async (t) => {
  const r = render(<Controlled />);
  const element = r.getByRole("textbox") as HTMLInputElement;

  t.is(element.value, "abc");

  await userEvent.clear(element);

  t.is(element.value, "");

  await userEvent.type(element, "xyz");

  t.is(element.value, "xyz");

  r.unmount();
});

class Controlled extends Component<unknown, { value: string }> {
  override state = {
    value: "abc",
  };

  override render(): ReactNode {
    return <TextField value={this.state.value} onChange={this.handleChange} />;
  }

  private handleChange = (value: string): void => {
    this.setState({ value });
  };
}
