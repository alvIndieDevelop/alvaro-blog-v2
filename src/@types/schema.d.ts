import { MdStringObject } from "notion-to-md/build/types";

export type Tag = {
  color: string;
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  cover: string;
  title: string;
  tags: Tag[];
  description: string;
  date: string;
};

export type PostPage = {
  post: BlogPost;
  markdown: string | MdStringObject;
};

// Notion API types for better type safety
export interface NotionPage {
  id: string;
  cover: {
    type: "file" | "external";
    file?: { url: string };
    external?: { url: string };
  } | null;
  properties: {
    Name: {
      title: Array<{ plain_text: string }>;
    };
    Tags: {
      multi_select: Tag[];
    };
    Description: {
      rich_text: Array<{ plain_text: string }>;
    };
    Updated: {
      last_edited_time: string;
    };
    Slug: {
      formula: { string: string };
    };
    Published: {
      checkbox: boolean;
    };
  };
}
