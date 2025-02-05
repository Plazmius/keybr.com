import {
  type WordList,
  WordListLoader,
  wordListStats,
} from "@keybr/content-words";
import { languageName, useIntlNumbers } from "@keybr/intl";
import { Language } from "@keybr/layout";
import { useSettings } from "@keybr/settings";
import {
  Field,
  FieldList,
  FieldSet,
  NameValue,
  OptionList,
  Para,
  Range,
  styleSizeFull,
  styleSizeWide,
  TextField,
} from "@keybr/widget";
import { type ReactNode } from "react";
import { useIntl } from "react-intl";
import { typingTestProps } from "../../../settings.ts";

export function CommonWordsSettings(): ReactNode {
  const { settings } = useSettings();
  return (
    <WordListLoader language={settings.get(typingTestProps.language)}>
      {(wordList) => (
        <Content
          wordList={wordList.slice(
            0,
            settings.get(typingTestProps.wordList.wordListSize),
          )}
        />
      )}
    </WordListLoader>
  );
}

function Content({ wordList }: { readonly wordList: WordList }): ReactNode {
  const { settings, updateSettings } = useSettings();
  const { formatMessage } = useIntl();
  const { formatNumber } = useIntlNumbers();
  const { wordCount, avgWordLength } = wordListStats(wordList);
  return (
    <FieldSet legend="Common words">
      <Para>Type the common words.</Para>

      <FieldList>
        <Field>
          {formatMessage({
            id: "settings.selectLanguageLabel",
            description: "Input field label.",
            defaultMessage: "Language:",
          })}
        </Field>

        <Field>
          <OptionList
            options={Language.ALL.map((item) => ({
              value: item.id,
              name: formatMessage(languageName(item.id)),
            }))}
            title={formatMessage({
              id: "settings.selectLanguageTitle",
              description: "Input field title.",
              defaultMessage: "Select your spoken language.",
            })}
            value={String(settings.get(typingTestProps.language))}
            onSelect={(id) => {
              updateSettings(
                settings.set(typingTestProps.language, Language.ALL.get(id)),
              );
            }}
          />
        </Field>
      </FieldList>

      <FieldList>
        <Field>
          {formatMessage({
            id: "settings.wordListSizeLabel",
            description: "Input field label.",
            defaultMessage: "Word list size:",
          })}
        </Field>
        <Field>
          <Range
            className={styleSizeWide}
            min={typingTestProps.wordList.wordListSize.min}
            max={typingTestProps.wordList.wordListSize.max}
            step={1}
            value={settings.get(typingTestProps.wordList.wordListSize)}
            title={formatMessage({
              id: "settings.wordListSizeTitle",
              description: "Input field title.",
              defaultMessage: "Chose how many common words to use.",
            })}
            onChange={(value) => {
              updateSettings(
                settings.set(typingTestProps.wordList.wordListSize, value),
              );
            }}
          />
        </Field>
      </FieldList>

      <Para>
        <TextField
          className={styleSizeFull}
          type="textarea"
          value={wordList.join(", ")}
          disabled={true}
        />
      </Para>

      <FieldList>
        <Field>
          <NameValue
            name={formatMessage({
              id: "textStats.uniqueWordCount",
              description: "Text label.",
              defaultMessage: "Unique words",
            })}
            value={formatNumber(wordCount)}
          />
        </Field>
        <Field>
          <NameValue
            name={formatMessage({
              id: "textStats.averageWordLength",
              description: "Text label.",
              defaultMessage: "Average word length",
            })}
            value={formatNumber(avgWordLength, 2)}
          />
        </Field>
      </FieldList>
    </FieldSet>
  );
}
