import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import ShareButtons from "@/components/ShareButtons";
import { format } from "date-fns";
import remarkGfm from "remark-gfm";
import { Scroll, Clock, Calendar, User, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Scroll Not Found" };
  }

  return {
    title: `${post.title} | Ancient Scrolls`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <article className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Back to Archive */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-foreground">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Archive
            </Link>
          </Button>
        </div>

        {/* Scroll Header */}
        <header className="mb-10 pb-8 border-b border-primary/20">
          {/* Scroll badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
              <Scroll className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Ancient Scroll</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{post.description}</p>
          
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {format(new Date(post.date), "MMMM d, yyyy")}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>Scribed by {post.author}</span>
            </div>
          </div>

          {/* Tags as knowledge domains */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/10">
                <Sparkles className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Scroll Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-code:text-primary">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>

        {/* Scroll Footer */}
        <footer className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Scroll className="h-4 w-4 text-primary" />
                Share this scroll
              </h3>
              <ShareButtons
                url={`https://alvaro-blog.netlify.app/blog/${slug}`}
                title={post.title}
              />
            </div>
            
            <div className="text-right">
              <p className="text-sm text-muted-foreground italic">
                ✨ May this knowledge serve you well on your journey
              </p>
            </div>
          </div>

          {/* Back to archive link */}
          <div className="mt-8 text-center">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
                Return to the Archive
              </Link>
            </Button>
          </div>
        </footer>
      </article>
    </div>
  );
}
