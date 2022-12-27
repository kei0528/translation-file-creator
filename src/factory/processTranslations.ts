import { Keys, KeyTranslationPair, Translations } from "../types/translation.type";

export const processTranslations = (translations: Translations, keys: Keys) => {
  return translations.map((translation) => {
    const translation_processed: KeyTranslationPair = {};

    translation.translationContents.forEach((content, index) => {
      translation_processed[keys[index]] = content;
    });

    return {
      lang: translation.lang,
      contents: translation_processed,
    };
  });
};
