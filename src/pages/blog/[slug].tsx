import React from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import NotionService from "../../services/notion-services";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import ShareButtons from "../../components/ShareButtons";

export default function Article({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const shareUrl = `https://alvaro-blog.netlify.app/blog/${post.slug}`;
  return (
    <>
      <NextSeo
        title={`${post.title} | Alvaro Martin Caballero`}
        description={post.title}
        openGraph={{
          title: post.title,
          description: post.description,
          url: `https://alvaro-blog.netlify.app/blog/${post.slug}`,
          type: "article",
          article: {
            publishedTime: post.date,
            tags: post.tags,
          },
        }}
      />
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
      <div className="flex-1 py-12">
        <div className="container px-4 mx-auto">
          <div className="flex gap-8">
            <article className="flex-1 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Header */}
                <header className="mb-12">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl font-bold mb-6"
                  >
                    <div className="relative h-60 mb-4">
                      <Image src={post.cover} alt={post.title} fill />
                    </div>
                    {post.title}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap items-center gap-4 text-muted-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>
                        {formatDistanceToNow(new Date(post.date), {
                          addSuffix: true,
                        })}
                      </time>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readingTime}</span>
                    </div> */}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 mt-4"
                  >
                    {post.tags.map((tag: any) => (
                      <Badge key={tag.id} variant="secondary">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag.name}
                      </Badge>
                    ))}
                  </motion.div>
                </header>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className=" prose dark:prose-invert max-w-none text-neutral-900 dark:text-neutral-100"
                >
                  <ReactMarkdown>{markdown.parent}</ReactMarkdown>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <h2>Compartir</h2>
                  <ShareButtons url={shareUrl} title={post.title} />
                </motion.div>
              </motion.div>
            </article>
          </div>
        </div>
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
