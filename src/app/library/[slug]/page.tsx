import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { RealmLayout } from "@/components/layouts/RealmLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ShareButtons from "@/components/ShareButtons";
import { format } from "date-fns";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock, User, Scroll, BookOpen, Share2, Sparkles } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Scroll Not Found",
    };
  }

  return {
    title: `${post.title} | The Library`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function LibraryPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <RealmLayout realm="library">
      <article className="container mx-auto px-4 py-12">
        {/* Back link */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="text-blue-500 hover:text-blue-400">
            <Link href="/library">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Link>
          </Button>
        </div>

        {/* Header */}
        <header className="max-w-3xl mx-auto mb-12">
          {/* Scroll badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10">
              <Scroll className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-400">Ancient Scroll</span>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-void-surface border border-blue-600/20">
              <Calendar className="h-4 w-4 text-blue-500" />
              <time dateTime={post.date}>
                {format(new Date(post.date), "MMMM d, yyyy")}
              </time>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-void-surface border border-gold/20">
              <Clock className="h-4 w-4 text-gold" />
              <span>{post.readingTime}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-void-surface border border-border">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Scribed by {post.author}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="seal">
                <Sparkles className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Divider */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-blue-600/30" />
            <BookOpen className="h-5 w-5 text-blue-500/40" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-blue-600/30" />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-blue-400
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-code:text-blue-300 prose-code:bg-void-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-void-surface prose-pre:border prose-pre:border-blue-600/20
            prose-blockquote:border-l-blue-500 prose-blockquote:bg-void-surface/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
            prose-ul:text-muted-foreground prose-ol:text-muted-foreground
            prose-li:marker:text-blue-500
          ">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="max-w-3xl mx-auto mt-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-blue-600/30" />
            <Scroll className="h-5 w-5 text-blue-500/40" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-blue-600/30" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-400">
                <Share2 className="h-4 w-4" />
                Share this scroll
              </h3>
              <ShareButtons
                url={`https://alvaro-blog.netlify.app/library/${slug}`}
                title={post.title}
              />
            </div>
            
            <div className="text-right">
              <p className="text-sm text-muted-foreground italic">
                ✨ May this knowledge serve you well on your journey
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild className="gap-2 border-blue-600/30 text-blue-500 hover:bg-blue-600/10">
              <Link href="/library">
                <ArrowLeft className="h-4 w-4" />
                Return to the Library
              </Link>
            </Button>
          </div>
        </footer>
      </article>
    </RealmLayout>
  );
}
