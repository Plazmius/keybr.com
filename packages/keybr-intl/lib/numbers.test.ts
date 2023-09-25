import test from "ava";
import { createIntl } from "react-intl";
import { makeIntlNumbers } from "./numbers.ts";

test("unique instance", (t) => {
  const intl = createIntl({ locale: "en-US" });
  const a = makeIntlNumbers(intl);
  const b = makeIntlNumbers(intl);

  t.true(a === b);
});

test("format integer", (t) => {
  const { formatInteger } = makeIntlNumbers(createIntl({ locale: "en-US" }));

  t.is(formatInteger(123.456), "123");
  t.is(formatInteger(123.789), "124");
});

test("format number", (t) => {
  const { formatNumber } = makeIntlNumbers(createIntl({ locale: "en-US" }));

  t.is(formatNumber(999.123456), "999.123");
  t.is(formatNumber(999.123456, 1), "999.1");
  t.is(formatNumber(999.123456, 2), "999.12");
  t.is(formatNumber(999.123456, 3), "999.123");
});

test("format percents", (t) => {
  const { formatPercents } = makeIntlNumbers(createIntl({ locale: "en-US" }));

  t.is(formatPercents(0.99123456), "99.12%");
  t.is(formatPercents(0.99123456, 1), "99.1%");
  t.is(formatPercents(0.99123456, 2), "99.12%");
  t.is(formatPercents(0.99123456, 3), "99.123%");
});
