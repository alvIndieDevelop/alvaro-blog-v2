import { GetStaticProps, InferGetStaticPropsType } from "next";
import { BlogPost } from "@/@types/schema";
import NotionService from "@/services/notion-services";
import BlogCard from "@/components/BlogCard";
import Head from "next/head";

export default function blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Blog!</title>
        <meta
          name={"description"}
          title={"description"}
          content={"Lista de mis articulos"}
        />
        <meta name={"og:title"} title={"og:title"} content={"Blog!"} />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={"Lista de mis articulos"}
        />
      </Head>
      <h1>Articulos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post: BlogPost) => (
          <div key={post.id} className="">
            <BlogCard key={post.id} post={post} />
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionServices = new NotionService();
  const posts = await notionServices.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60,
  };
};
