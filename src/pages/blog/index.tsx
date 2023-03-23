import { GetStaticProps, InferGetStaticPropsType } from "next";
import { BlogPost } from "@/@types/schema";
import NotionService from "@/services/notion-services";
import BlogCard from "@/components/BlogCard";

export default function blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (posts.length > 0) {
    return (
      <div>
        Blog page
        {posts.map((post: BlogPost) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionServices = new NotionService();
  const posts = await notionServices.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};
