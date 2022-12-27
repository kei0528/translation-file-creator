"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTranslationKeys = void 0;
const createTranslationKeys = (notionData) => {
    if (notionData.results.length === 0)
        return;
    const keys = notionData.results.map((result) => {
        const _result = result;
        return _result.properties.Key.title[0].plain_text;
    });
    return keys;
};
exports.createTranslationKeys = createTranslationKeys;
