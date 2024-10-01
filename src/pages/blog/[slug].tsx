import { GetStaticProps, InferGetStaticPropsType } from "next";
import NotionService from "@/services/notion-services";
import Head from "next/head";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Article({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name={"description"}
          title={"description"}
          content={post.description}
        />
        <meta name={"og:title"} title={"og:title"} content={post.title} />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={post.description}
        />
        <meta name={"og:image"} title={"og:image"} content={post.cover} />
      </Head>

      <div className="py-8">
        <main className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center">
            <article className="prose">
              <img
                src={post.cover}
                alt={`Cover image for ${post.title}`}
                className="w-full h-48 object-cover"
              />
              <h1>{post.title}</h1>
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </article>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionServices = new NotionService();
  // @ts-ignore
  const post = await notionServices.getSingleBlogPost(context.params?.slug);

  if (!post) {
    throw "";
  }

  return {
    props: {
      markdown: post.markdown,
      post: post.post,
    },
  };
};

export async function getStaticPaths() {
  const notionServices = new NotionService();
  const posts = await notionServices.getPublishedBlogPosts();
  const paths = posts.map((post) => {
    return `/blog/${post.slug}`;
  });

  return {
    paths,
    fallback: "blocking",
  };
}
