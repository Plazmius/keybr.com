import { messages } from "@keybr/lesson-ui";
import { SpeedUnit, useSettings } from "@keybr/settings";
import { Field, FieldList, FieldSet, Para, RadioBox } from "@keybr/widget";
import { type ReactNode } from "react";
import { useIntl } from "react-intl";

export function MiscSettings(): ReactNode {
  const { formatMessage } = useIntl();
  const { settings, updateSettings } = useSettings();

  return (
    <>
      <FieldSet
        legend={formatMessage({
          id: "settings.interfaceOptionsLegend",
          description: "Fieldset legend.",
          defaultMessage: "Interface Options",
        })}
      >
        <FieldList>
          <Field>
            {formatMessage({
              id: "settings.typingSpeedUnitCaption",
              description: "Radio button group caption.",
              defaultMessage: "Measure typing speed in:",
            })}
          </Field>

          <Field>
            <RadioBox
              checked={settings.speedUnit === SpeedUnit.WPM}
              name="speed-unit"
              label={formatMessage(messages.wpmName)}
              title={formatMessage(messages.wpmDescription)}
              onSelect={() =>
                updateSettings(
                  settings.patch({
                    speedUnit: SpeedUnit.WPM,
                  }),
                )
              }
            />
          </Field>

          <Field>
            <RadioBox
              checked={settings.speedUnit === SpeedUnit.CPM}
              name="speed-unit"
              label={formatMessage(messages.cpmName)}
              title={formatMessage(messages.cpmDescription)}
              onSelect={() =>
                updateSettings(
                  settings.patch({
                    speedUnit: SpeedUnit.CPM,
                  }),
                )
              }
            />
          </Field>

          <Field>
            <RadioBox
              checked={settings.speedUnit === SpeedUnit.CPS}
              name="speed-unit"
              label={formatMessage(messages.cpsName)}
              title={formatMessage(messages.cpsDescription)}
              onSelect={() =>
                updateSettings(
                  settings.patch({
                    speedUnit: SpeedUnit.CPS,
                  }),
                )
              }
            />
          </Field>
        </FieldList>

        <Para>
          {formatMessage({
            id: "settings.typingSpeedUnitDescription",
            description: "Radio button group description.",
            defaultMessage:
              "For the purpose of typing measurement, each word is standardized to be five characters or keystrokes in English, including spaces and punctuation.",
          })}
        </Para>
      </FieldSet>
    </>
  );
}
