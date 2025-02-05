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
  featured: boolean;
};

export type PostPage = {
  post: BlogPost;
  markdown: string | MdStringObject;
};
