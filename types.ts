export interface UnicodeCharData {
  char: string;
  name: string;
  category: string;
  description: string;
}

export interface EncodingDetails {
  hex: string;
  decimal: number;
  utf8: string;
  utf16: string;
  htmlEntity: string;
  cssCode: string;
}

export enum AppTab {
  EXPLORER = 'EXPLORER',
  TRANSFORMER = 'TRANSFORMER',
  ABOUT = 'ABOUT'
}

export type TransformStyle = 
  | 'bold' 
  | 'italic' 
  | 'boldItalic' 
  | 'script' 
  | 'boldScript' 
  | 'fraktur' 
  | 'doubleStruck' 
  | 'sansSerif' 
  | 'sansSerifBold' 
  | 'monospace'
  | 'circled'
  | 'squared';