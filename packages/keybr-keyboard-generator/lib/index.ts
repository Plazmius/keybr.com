import { parseCldr } from "./cldr.ts";
import { writeGeneratedFile } from "./generate.ts";
import { type LayoutConfig } from "./layout.ts";
import { LAYOUT_EN_CUSTOM } from "./layout/layout_en_custom.ts";
import { LAYOUT_EN_US_COLEMAK } from "./layout/layout_en_us_colemak.ts";
import { LAYOUT_EN_US_WORKMAN } from "./layout/layout_en_us_workman.ts";
import { LAYOUT_FR_BEPO } from "./layout/layout_fr_bepo.ts";
import { LAYOUT_FR_OPTIMOT } from "./layout/layout_fr_optimot.ts";
import { readXml } from "./xml.ts";

const files: readonly [input: string | LayoutConfig, output: string][] = [
  [
    "cldr-keyboards-43.0/keyboards/windows/en-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/en_us-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/en-t-k0-windows-dvorak.xml",
    "../keybr-keyboard/lib/data/layout/en_us_dvorak-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/en-GB-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/en_uk-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/de-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/de_de-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/de-CH-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/de_ch-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/fr-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/fr_fr-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/fr-CA-t-k0-windows-var.xml",
    "../keybr-keyboard/lib/data/layout/fr_ca-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/fr-CH-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/fr_ch-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/it-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/it_it-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/es-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/es_es-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/pl-t-k0-windows-extended.xml",
    "../keybr-keyboard/lib/data/layout/pl_pl-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/pt-t-k0-windows-var.xml",
    "../keybr-keyboard/lib/data/layout/pt_br-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/pt-PT-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/pt_pt-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/be-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/be_by-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/ru-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/ru_ru-win.ts",
  ],
  [
    "cldr-keyboards-43.0/keyboards/windows/uk-t-k0-windows.xml",
    "../keybr-keyboard/lib/data/layout/uk_ua-win.ts",
  ],
  [LAYOUT_EN_US_COLEMAK, "../keybr-keyboard/lib/data/layout/en_us_colemak.ts"],
  [LAYOUT_EN_US_WORKMAN, "../keybr-keyboard/lib/data/layout/en_us_workman.ts"],
  [LAYOUT_FR_BEPO, "../keybr-keyboard/lib/data/layout/fr_bepo.ts"],
  [LAYOUT_FR_OPTIMOT, "../keybr-keyboard/lib/data/layout/fr_optimot.ts"],
  [LAYOUT_EN_CUSTOM, "../keybr-keyboard/lib/data/layout/en_custom.ts"],
];

for (const [input, output] of files) {
  console.log(output);
  if (typeof input === "string") {
    writeGeneratedFile(parseCldr(readXml(input)), output);
  } else {
    writeGeneratedFile(input, output);
  }
}
