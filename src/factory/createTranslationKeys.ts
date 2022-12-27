import { NotionDatabase } from "../types/notion.type";
import { Keys } from "../types/translation.type";

export const createTranslationKeys = (notionData: NotionDatabase) => {
  if (notionData.results.length === 0) return;

  const keys = notionData.results.map((result) => {
    const _result = result as any;
    return _result.properties.Key.title[0].plain_text;
  });

  return keys as Keys;
};
