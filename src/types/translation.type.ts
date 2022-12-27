export type TranslationContents = string[];
export type Translation = { lang: string; translationContents: TranslationContents };
export type Translations = Translation[];
export type Keys = string[];
export type KeyTranslationPair = { [key: string]: string };
export type TranslationProcessed = {
  lang: string;
  contents: KeyTranslationPair;
}[];
