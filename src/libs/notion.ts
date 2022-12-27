import { Client } from "@notionhq/client";
import { notionToken } from "./env";

export const notion = new Client({
  auth: notionToken,
});
