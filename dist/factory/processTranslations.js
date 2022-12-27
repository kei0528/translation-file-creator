"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTranslations = void 0;
const processTranslations = (translations, keys) => {
    return translations.map((translation) => {
        const translation_processed = {};
        translation.translationContents.forEach((content, index) => {
            translation_processed[keys[index]] = content;
        });
        return {
            lang: translation.lang,
            contents: translation_processed,
        };
    });
};
exports.processTranslations = processTranslations;
