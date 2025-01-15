"use client";
import { motion } from "framer-motion";
import { PostCard } from "./post-card";

const posts = [
  {
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js",
    date: "2024-01-15",
    slug: "getting-started-with-nextjs"
  },
  // Add more posts as needed
];

export default function Blog() {
  return (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <PostCard {...post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}