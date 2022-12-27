import { NotionDatabase } from "../types/notion.type";
import { Translation } from "../types/translation.type";

const textToHTML = (richTextObj: any) => {
  const { annotations } = richTextObj;

  const hasTextStyling = Object.keys(annotations)
    .map((key) => (key === "color" ? annotations[key] !== "default" : annotations[key]))
    .some((boolean) => boolean);

  if (!hasTextStyling && richTextObj.href === null) return richTextObj.text.content;

  const wrapperElm = richTextObj.href === null ? "span" : "a";
  const textStyle = `${annotations.italic ? "font-style: italic;" : ""}${annotations.bold ? "font-weight: bold;" : ""}${
    annotations.strikethrough ? "text-decoration: line-through;" : ""
  }${annotations.underline ? "text-decoration: underline;" : ""}${
    annotations.color !== "default" ? `color: ${annotations.color};` : ""
  }`;

  return `
  <${wrapperElm} ${wrapperElm === "a" ? `href="${richTextObj.href}"` : ""} ${
    hasTextStyling ? `style="${textStyle}"` : ""
  }>${richTextObj.text.content}</${wrapperElm}>
  `;
};

export const createTranslation = (notionData: NotionDatabase) => {
  if (notionData.results.length === 0) return;

  const languageOptions = Object.keys(notionData.results[0].properties).filter((key) => key !== "Key");

  const translations = languageOptions.map((lang) => {
    const translationContents = notionData.results.map((result) => {
      const res = result as any;
      const richTextObjs = res.properties[lang].rich_text;

      return richTextObjs.map((obj: any) => textToHTML(obj)).join("");
    });

    return { lang, translationContents } as Translation;
  });

  return translations;
};
