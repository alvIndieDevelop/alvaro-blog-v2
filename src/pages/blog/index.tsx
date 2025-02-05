import React, { useState } from "react";
import { NextSeo } from "next-seo";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { BlogPost } from "../../@types/schema";
import NotionService from "../../services/notion-services";
import BlogCard from "../../components/BlogCard";
import { motion } from "framer-motion";
import Pagination from "../../components/Pagination";
import TagFilter from "../../components/TagFilter";
import { Search } from "lucide-react";

const POSTS_PER_PAGE = 6;

export default function BlogPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // obtener las categorias unicas de los posts.
  const uniqueCategories = [
    ...Array.from(
      new Set(
        posts.flatMap((post: BlogPost) => post.tags.map((tag) => tag.name))
      )
    ),
  ];

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((selectedTag) => selectedTag !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1); // Reset to first page when selecting a tag
  };

  const filteredPosts = posts.filter((post: BlogPost) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) =>
        post.tags.some((postTag) => postTag.name === tag)
      );

    return matchesSearch && matchesTags;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  return (
    <>
      <NextSeo
        title="Blog | Alvaro Martin Caballero"
        description="Read my latest articles about web development, programming tips, and tech insights."
        openGraph={{
          title: "Blog | Alvaro Martin Caballero",
          description: "Web development articles and tech insights.",
          url: "https://alvaro-blog.netlify.app/blog",
          siteName: "Alvaro Blog",
        }}
      />
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
      <main className="flex-1">
        <section id="blog" className="py-20">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Latest Posts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Thoughts, tutorials, and insights about web development.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              {/* Tag Filter */}
              <TagFilter
                tags={uniqueCategories as string[]}
                selectedTags={selectedTags}
                onTagSelect={handleTagSelect}
              />
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post: BlogPost) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>

            {/* Show pagination only if there are multiple pages */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {/* No results message */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No articles found matching your search.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionServices = new NotionService();
  let posts: BlogPost[];
  try {
    posts = await notionServices.getPublishedBlogPosts();
  } catch (error) {
    posts = [];
  }

  console.log(posts);

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
