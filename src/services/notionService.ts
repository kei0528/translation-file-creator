import { NotionDatabase } from "../types/notion.type";
import { notion } from "../libs/notion";

export const getNotionDatabase = async (databaseId: string) => {
  const response = (await notion.databases.query({
    database_id: databaseId,
  })) as NotionDatabase;
  return response;
};
