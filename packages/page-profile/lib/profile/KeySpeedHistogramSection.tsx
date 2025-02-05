import { KeySpeedHistogram } from "@keybr/chart";
import { type KeyStatsMap } from "@keybr/result";
import { Figure } from "@keybr/widget";
import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { ChartWrapper } from "./widgets.tsx";

export function KeySpeedHistogramSection({
  keyStatsMap,
}: {
  readonly keyStatsMap: KeyStatsMap;
}): ReactNode {
  return (
    <Figure>
      <Figure.Caption>
        <FormattedMessage
          id="profile.chart.keySpeedHistogramCaption"
          description="Chart caption."
          defaultMessage="Key Typing Speed Histogram"
        />
      </Figure.Caption>

      <Figure.Description>
        <FormattedMessage
          id="profile.chart.keySpeedHistogramDescription"
          description="Chart description."
          defaultMessage="This chart shows the average typing speed for each individual key."
        />
      </Figure.Description>

      <ChartWrapper>
        <KeySpeedHistogram
          keyStatsMap={keyStatsMap}
          width="100%"
          height="18rem"
        />
      </ChartWrapper>
    </Figure>
  );
}
