import { EncodingDetails, TransformStyle } from '../types';

export const getEncodingDetails = (char: string): EncodingDetails => {
  const codePoint = char.codePointAt(0) || 0;
  
  // UTF-8 Calculation
  let utf8 = '';
  if (codePoint <= 0x7F) {
    utf8 = '\\x' + codePoint.toString(16).toUpperCase().padStart(2, '0');
  } else {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(char);
    utf8 = Array.from(bytes).map(b => '\\x' + b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
  }

  // UTF-16 Calculation
  let utf16 = '';
  if (codePoint <= 0xFFFF) {
    utf16 = '\\u' + codePoint.toString(16).toUpperCase().padStart(4, '0');
  } else {
    const high = Math.floor((codePoint - 0x10000) / 0x400) + 0xD800;
    const low = ((codePoint - 0x10000) % 0x400) + 0xDC00;
    utf16 = '\\u' + high.toString(16).toUpperCase() + ' \\u' + low.toString(16).toUpperCase();
  }

  return {
    hex: `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`,
    decimal: codePoint,
    utf8,
    utf16,
    htmlEntity: `&#${codePoint};`,
    cssCode: `\\${codePoint.toString(16).toUpperCase()}`
  };
};

// Character maps for transformations
const TRANSFORM_MAPS: Record<TransformStyle, { A: number; a: number; 0?: number }> = {
  bold: { A: 0x1D400, a: 0x1D41A, 0: 0x1D7CE },
  italic: { A: 0x1D434, a: 0x1D44E },
  boldItalic: { A: 0x1D468, a: 0x1D482 },
  script: { A: 0x1D49C, a: 0x1D4B6 },
  boldScript: { A: 0x1D4D0, a: 0x1D4EA },
  fraktur: { A: 0x1D504, a: 0x1D51E },
  doubleStruck: { A: 0x1D538, a: 0x1D552, 0: 0x1D7D8 },
  sansSerif: { A: 0x1D5A0, a: 0x1D5BA, 0: 0x1D7E2 },
  sansSerifBold: { A: 0x1D5D4, a: 0x1D5EE, 0: 0x1D7EC },
  monospace: { A: 0x1D670, a: 0x1D68A, 0: 0x1D7F6 },
  circled: { A: 0x24B6, a: 0x24D0, 0: 0x24EA },
  squared: { A: 0x1F130, a: 0x1F130, 0: 0x2080 }, // Lowercase mapped to uppercase for squared usually
};

// Exceptions for Script and Fraktur where some characters are in different blocks
const EXCEPTIONS: Record<number, number> = {
  // Script H, B, E, F, I, L, M, R (etc - basic set for demo)
  0x1D49E: 0x212C, // Script B
  0x1D49F: 0x212D, // Script C (Not really exception but often mixed)
  0x1D4A0: 0x2130, // Script E
  0x1D4A1: 0x2131, // Script F
  0x1D4A3: 0x210B, // Script H
  0x1D4A4: 0x2110, // Script I
  0x1D4A7: 0x2112, // Script L
  0x1D4A8: 0x2133, // Script M
  0x1D4AD: 0x211B, // Script R
  0x1D4BA: 0x212F, // Script e
  0x1D4BC: 0x210A, // Script g
  0x1D4C4: 0x2134, // Script o
};

export const transformText = (text: string, style: TransformStyle): string => {
  const map = TRANSFORM_MAPS[style];
  if (!map) return text;

  return Array.from(text).map(char => {
    const code = char.codePointAt(0);
    if (!code) return char;

    let offset = 0;
    let base = 0;

    // Digits 0-9
    if (code >= 48 && code <= 57 && map[0] !== undefined) {
      base = map[0];
      offset = code - 48;
      return String.fromCodePoint(base + offset);
    }

    // Uppercase A-Z
    if (code >= 65 && code <= 90) {
      base = map.A;
      offset = code - 65;
    }
    // Lowercase a-z
    else if (code >= 97 && code <= 122) {
      base = map.a;
      offset = code - 97;
    } 
    else {
      return char;
    }

    let targetCode = base + offset;
    
    // Handle exceptions for Script/Fraktur holes
    if (EXCEPTIONS[targetCode]) {
        targetCode = EXCEPTIONS[targetCode];
    }
    
    // Squared lower case fix (map to upper)
    if (style === 'squared' && code >= 97 && code <= 122) {
        targetCode = map.A + (code - 97);
    }

    return String.fromCodePoint(targetCode);
  }).join('');
};

export const STYLE_LABELS: Record<TransformStyle, string> = {
    bold: "𝐁𝐨𝐥𝐝",
    italic: "𝐼𝑡𝑎𝑙𝑖𝑐",
    boldItalic: "𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄",
    script: "𝒮𝒸𝓇𝒾𝓅𝓉",
    boldScript: "𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽",
    fraktur: "𝔉𝔯𝔞𝔨𝔱𝔲𝔯",
    doubleStruck: "𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜",
    sansSerif: "𝖲𝖺𝗇𝗌 𝖲𝖾𝗋𝗂𝖿",
    sansSerifBold: "𝗦𝗮𝗻𝘀 𝗕𝗼𝗹𝗱",
    monospace: "𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎",
    circled: "Ⓒⓘⓡⓒⓛⓔⓓ",
    squared: "🅂🅀🅄🄰🅁🄴🅉"
}