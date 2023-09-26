import { type LayoutConfig } from "../layout.ts";

export const LAYOUT_FR_BEPO: LayoutConfig = {
  codePoints: {
    Backquote: ["$", "#", "–", "¶"],
    Digit1: ['"', "1", "—", "„"],
    Digit2: ["«", "2", "<", "“"],
    Digit3: ["»", "3", ">", "”"],
    Digit4: ["(", "4", "[", "≤"],
    Digit5: [")", "5", "]", "≥"],
    Digit6: ["@", "6", "^"],
    Digit7: ["+", "7", "±", "¬"],
    Digit8: ["-", "8", "−", "¼"],
    Digit9: ["/", "9", "÷", "½"],
    Digit0: ["*", "0", "×", "¾"],
    Minus: ["=", "°", "≠", "′"],
    Equal: ["%", "`", "‰", "″"],
    KeyQ: ["b", "B", "|"],
    KeyW: ["é", "É", "*´", "*˝"],
    KeyE: ["p", "P", "&", "§"],
    KeyR: ["o", "O", "œ", "Œ"],
    KeyT: ["è", "È", "*`"],
    KeyY: ["*^", "!", "¡"],
    KeyU: ["v", "V", "*ˇ"],
    KeyI: ["d", "D"],
    KeyO: ["l", "L"],
    KeyP: ["j", "J"],
    BracketLeft: ["z", "Z"],
    BracketRight: ["w", "W", "*˘"],
    KeyA: ["a", "A", "æ", "Æ"],
    KeyS: ["u", "U", "ù", "Ù"],
    KeyD: ["i", "I", "*¨", "*˙"],
    KeyF: ["e", "E", "€"],
    KeyG: [",", ";", "’"],
    KeyH: ["c", "C", "©", "ſ"],
    KeyJ: ["t", "T"],
    KeyK: ["s", "S", "ß", "ẞ"],
    KeyL: ["r", "R", "®", "™"],
    Semicolon: ["n", "N", "*~"],
    Quote: ["m", "M", "*¯"],
    Backslash: ["ç", "Ç", "*¸"],
    IntlBackslash: ["ê", "Ê", "/"],
    KeyZ: ["à", "À", "\\"],
    KeyX: ["y", "Y", "{", "‘"],
    KeyC: ["x", "X", "}", "’"],
    KeyV: [".", ":", "…", "·"],
    KeyB: ["k", "K", "~"],
    KeyN: ["'", "?", "¿"],
    KeyM: ["q", "Q", "*°"],
    Comma: ["g", "G"],
    Period: ["h", "H", "†", "‡"],
    Slash: ["f", "F", "*˛"],
    Space: [" ", 0x202f, "_", 0x00a0],
  },
};