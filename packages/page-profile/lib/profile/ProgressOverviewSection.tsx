import { Marker, ProgressOverviewChart } from "@keybr/chart";
import { type KeyStatsMap } from "@keybr/result";
import { Figure } from "@keybr/widget";
import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { ChartWrapper } from "./widgets.tsx";

export function ProgressOverviewSection({
  keyStatsMap,
}: {
  readonly keyStatsMap: KeyStatsMap;
}): ReactNode {
  return (
    <Figure>
      <Figure.Caption>
        <FormattedMessage
          id="profile.chart.progressOverviewCaption"
          description="Chart caption."
          defaultMessage="Learning Progress Overview"
        />
      </Figure.Caption>

      <Figure.Description>
        <FormattedMessage
          id="profile.chart.progressOverviewDescription"
          description="Chart description."
          defaultMessage="This chart shows the learning progress overview for all keys."
        />
      </Figure.Description>

      <ChartWrapper>
        <ProgressOverviewChart
          keyStatsMap={keyStatsMap}
          width="100%"
          height="35rem"
        />
      </ChartWrapper>

      <Figure.Legend>
        <FormattedMessage
          id="profile.chart.progressOverviewLegend"
          description="Chart legend."
          defaultMessage="Horizontal axis: lesson number. Vertical axis: typing speed for each individual key, {label1} – slow, {label2} – fast."
          values={{
            label1: <Marker type="slow" />,
            label2: <Marker type="fast" />,
          }}
        />
      </Figure.Legend>
    </Figure>
  );
}
