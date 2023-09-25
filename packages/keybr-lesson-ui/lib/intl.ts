import { defineMessages } from "react-intl";

export const messages = defineMessages({
  averageSpeedLabel: {
    id: "lesson.averageSpeedLabel",
    description: "Label name.",
    defaultMessage: "Average typing speed",
  },
  averageSpeedTitle: {
    id: "lesson.averageSpeedTitle",
    description: "Label title.",
    defaultMessage: "Average typing speed ({speedUnitName}).",
  },
  bestSpeedLabel: {
    id: "lesson.bestSpeedLabel",
    description: "Label name.",
    defaultMessage: "Best typing speed",
  },
  bestSpeedTitle: {
    id: "lesson.bestSpeedTitle",
    description: "Label title.",
    defaultMessage: "Best typing speed ({speedUnitName}).",
  },
  confidenceLevelLabel: {
    id: "lesson.confidenceLevelLabel",
    description: "Label name.",
    defaultMessage: "Confidence level",
  },
  confidenceLevelTitle: {
    id: "lesson.confidenceLevelTitle",
    description: "Label title.",
    defaultMessage: "Confidence level (from 0 to 1).",
  },
  notCalibratedText: {
    id: "lesson.notCalibratedText",
    description: "Panel text.",
    defaultMessage: "Not calibrated, need more samples",
  },
  characterName: {
    id: "lesson.characterName",
    description: "Character details text.",
    defaultMessage: "Character ''{name}''",
  },
  boostedKeyText: {
    id: "lesson.boostedKeyText",
    description: "Character details text.",
    defaultMessage: "A key with boosted frequency.",
  },
  forcedKeyText: {
    id: "lesson.forcedKeyText",
    description: "Character details text.",
    defaultMessage: "A manually added key.",
  },
  wpmName: {
    id: "speedUnit.wpm.name",
    description: "Widget label.",
    defaultMessage: "Words per minute",
  },
  wpmDescription: {
    id: "speedUnit.wpm.description",
    description: "Widget title.",
    defaultMessage: "Measure typing speed in words per minute.",
  },
  cpmName: {
    id: "speedUnit.cpm.name",
    description: "Widget label.",
    defaultMessage: "Characters per minute",
  },
  cpmDescription: {
    id: "speedUnit.cpm.description",
    description: "Widget title.",
    defaultMessage: "Measure typing speed in characters per minute.",
  },
  cpsName: {
    id: "speedUnit.cps.name",
    description: "Widget label.",
    defaultMessage: "Characters per second",
  },
  cpsDescription: {
    id: "speedUnit.cps.description",
    description: "Widget title.",
    defaultMessage: "Measure typing speed in characters per second.",
  },
});
