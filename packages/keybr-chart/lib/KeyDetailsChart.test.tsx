import { FakeIntlProvider } from "@keybr/intl";
import { LessonKey } from "@keybr/lesson";
import { FakePhoneticModel } from "@keybr/phonetic-model";
import { generateKeySamples } from "@keybr/result";
import { FakeSettingsContext } from "@keybr/settings";
import { render } from "@testing-library/react";
import test from "ava";
import { KeyDetailsChart } from "./KeyDetailsChart.tsx";
import { LearningRate } from "./learningrate.ts";

test("render empty", (t) => {
  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <KeyDetailsChart
          lessonKey={
            new LessonKey({
              letter: FakePhoneticModel.letter1,
              timeToType: 500,
              bestTimeToType: 500,
            })
          }
          learningRate={null}
          width="100px"
          height="100px"
        />
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );
  t.pass();
  r.unmount();
});

test("render non-empty", (t) => {
  const learningRate = LearningRate.from(generateKeySamples(10));
  t.not(learningRate, null);
  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <KeyDetailsChart
          lessonKey={
            new LessonKey({
              letter: FakePhoneticModel.letter1,
              timeToType: 500,
              bestTimeToType: 500,
            })
          }
          learningRate={learningRate}
          width="100px"
          height="100px"
        />
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );
  t.pass();
  r.unmount();
});