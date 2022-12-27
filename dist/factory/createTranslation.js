"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTranslation = void 0;
const textToHTML = (richTextObj) => {
    const { annotations } = richTextObj;
    const hasTextStyling = Object.keys(annotations)
        .map((key) => (key === "color" ? annotations[key] !== "default" : annotations[key]))
        .some((boolean) => boolean);
    if (!hasTextStyling && richTextObj.href === null)
        return richTextObj.text.content;
    const wrapperElm = richTextObj.href === null ? "span" : "a";
    const textStyle = `${annotations.italic ? "font-style: italic;" : ""}${annotations.bold ? "font-weight: bold;" : ""}${annotations.strikethrough ? "text-decoration: line-through;" : ""}${annotations.underline ? "text-decoration: underline;" : ""}${annotations.color !== "default" ? `color: ${annotations.color};` : ""}`;
    return `
  <${wrapperElm} ${wrapperElm === "a" ? `href="${richTextObj.href}"` : ""} ${hasTextStyling ? `style="${textStyle}"` : ""}>${richTextObj.text.content}</${wrapperElm}>
  `;
};
const createTranslation = (notionData) => {
    if (notionData.results.length === 0)
        return;
    const languageOptions = Object.keys(notionData.results[0].properties).filter((key) => key !== "Key");
    const translations = languageOptions.map((lang) => {
        const translationContents = notionData.results.map((result) => {
            const res = result;
            const richTextObjs = res.properties[lang].rich_text;
            return richTextObjs.map((obj) => textToHTML(obj)).join("");
        });
        return { lang, translationContents };
    });
    return translations;
};
exports.createTranslation = createTranslation;
