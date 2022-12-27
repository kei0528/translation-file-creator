import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionDatabase = QueryDatabaseResponse & {
  results: {
    object: string;
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: any;
    last_edited_by: any;
    cover: any;
    icon: any;
    parent: any;
    archived: boolean;
    properties: any;
    url: string;
  }[];
};
