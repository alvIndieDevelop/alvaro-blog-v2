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

      <main className="py-24 sm:py-32">
        <header className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Mis articulos!
            </h2>
            <p className="mt-2 text-lg leading-8">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
        </header>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 px-8 sm:mt-16 sm:pt-16 lg:mx-auto lg:max-w-full lg:grid-cols-3">
          {posts.map((post: BlogPost) => (
            <div key={post.id}>
              <BlogCard key={post.id} post={post} />
            </div>
          ))}
        </div>
      </main>
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
