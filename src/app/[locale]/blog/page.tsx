import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Scroll, BookOpen, Clock, Calendar, Sparkles, BookMarked, Library, Feather, Star, BookText, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Ancient Scrolls | Knowledge Archive",
  description: "A collection of wisdom, tutorials, and insights gathered throughout my journey.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="relative min-h-screen bg-void overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-ethereal/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-60 right-[10%] w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-[30%] w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-[20%] w-56 h-56 bg-ember/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Decorative vertical lines */}
        <div className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
        <div className="absolute top-0 right-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-ethereal/10 to-transparent" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
      </div>
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Hero Section - Enhanced */}
      <div className="relative pt-20 pb-16 border-b border-gold/10">
        {/* Decorative corner elements */}
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-gold/20 hidden lg:block" />
        <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-gold/20 hidden lg:block" />
        
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Decorative icon - Fixed spacing */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative mb-8">
                <div className="absolute -inset-6 rounded-full border border-gold/20" style={{ animation: 'spin 30s linear infinite' }} />
                <div className="absolute -inset-3 rounded-full border border-ethereal/20" style={{ animation: 'spin 20s linear infinite reverse' }} />
                <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-void-surface border-2 border-gold/40 shadow-lg shadow-gold/10">
                  <Library className="h-12 w-12 text-gold" />
                </div>
                {/* Floating particles around icon */}
                <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-gold/60 animate-pulse" />
                <div className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full bg-ethereal/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>

              {/* Badge - Now properly spaced */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-ethereal/30 bg-ethereal/10 backdrop-blur-sm">
                <BookMarked className="h-4 w-4 text-ethereal" />
                <span className="font-mono text-sm text-ethereal tracking-wide">Knowledge Archive</span>
              </div>
            </div>

            {/* Title with decorative elements */}
            <div className="relative mb-8">
              <div className="absolute left-1/2 -translate-x-1/2 -top-4 flex items-center gap-2 text-gold/30">
                <span className="text-2xl">✦</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-2">
                Ancient{" "}
                <span className="text-gradient-gold">Scrolls</span>
              </h1>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gold/40" />
                <Flame className="h-5 w-5 text-gold/60" />
                <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gold/40" />
              </div>
            </div>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Wisdom gathered from countless quests — tutorials, insights, and arcane knowledge 
              on web development and technology.
            </p>

            {/* Stats - Enhanced */}
            <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-void-surface/50 border border-gold/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gold/10 border border-gold/20">
                  <Scroll className="h-5 w-5 text-gold" />
                </div>
                <div className="text-left">
                  <p className="font-mono text-2xl font-bold text-gold">{posts.length}</p>
                  <p className="text-xs text-muted-foreground">Scrolls</p>
                </div>
              </div>
              <div className="h-10 w-[1px] bg-border" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ethereal/10 border border-ethereal/20">
                  <Sparkles className="h-5 w-5 text-ethereal" />
                </div>
                <div className="text-left">
                  <p className="font-mono text-2xl font-bold text-ethereal">{tags.length}</p>
                  <p className="text-xs text-muted-foreground">Domains</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Tags as "Knowledge Domains" - Enhanced */}
        {tags.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-void-surface border border-gold/20">
                <Sparkles className="h-5 w-5 text-gold" />
                <h2 className="font-display text-lg text-gold">
                  Knowledge Domains
                </h2>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {tags.map((tag, index) => (
                <Badge 
                  key={tag} 
                  variant="seal"
                  className="cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gold/20 text-sm px-4 py-2"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Posts as Scrolls */}
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="relative inline-block mb-10">
              <div className="absolute -inset-6 rounded-full border border-gold/20 animate-pulse" />
              <div className="absolute -inset-3 rounded-full border border-gold/10" />
              <div className="flex items-center justify-center w-28 h-28 rounded-full bg-void-surface border-2 border-gold/30">
                <BookOpen className="h-14 w-14 text-gold/50" />
              </div>
            </div>
            <p className="text-muted-foreground text-2xl mb-4 font-display">
              The archive is empty...
            </p>
            <p className="text-muted-foreground/60 italic flex items-center justify-center gap-2">
              <Feather className="h-4 w-4" />
              New scrolls are being written. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-ethereal/30" />
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-void-surface border border-ethereal/20">
                <BookText className="h-5 w-5 text-ethereal" />
                <h2 className="font-display text-lg text-ethereal">
                  Recent Discoveries
                </h2>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-ethereal/30" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card 
                    variant={index === 0 ? "elevated" : "default"}
                    className={`group h-full hover:-translate-y-2 transition-all duration-300 ${index === 0 ? "hover:shadow-2xl hover:shadow-ethereal/20 border-ethereal/30 lg:col-span-2" : "hover:shadow-xl hover:shadow-gold/10"}`}
                  >
                    {/* Featured badge for first post */}
                    {index === 0 && (
                      <div className="absolute -top-3 left-6 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-ethereal to-cyan-400 text-void text-xs font-bold shadow-lg shadow-ethereal/30">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        Latest Discovery
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      {/* Date and reading time */}
                      <div className="flex items-center justify-between mb-5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-void-surface/80 border border-border">
                          <Calendar className="h-4 w-4 text-gold" />
                          <time dateTime={post.date}>
                            {format(new Date(post.date), "MMMM d, yyyy")}
                          </time>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-void-surface/80 border border-border">
                          <Clock className="h-4 w-4 text-ethereal" />
                          <span>{post.readingTime}</span>
                        </div>
                      </div>
                      
                      <CardTitle className={`${index === 0 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} group-hover:text-gold transition-colors line-clamp-2 flex items-start gap-4`}>
                        <div className={`p-3 rounded-xl bg-gold/10 border border-gold/20 group-hover:bg-gold/20 group-hover:border-gold/40 transition-all ${index === 0 ? "p-4" : ""}`}>
                          <Scroll className={`${index === 0 ? "h-7 w-7" : "h-5 w-5"} text-gold`} />
                        </div>
                        <span className="pt-1">{post.title}</span>
                      </CardTitle>
                      <CardDescription className={`line-clamp-3 mt-4 ${index === 0 ? "text-base md:text-lg" : "text-base"} leading-relaxed`}>
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, index === 0 ? 5 : 3).map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="skill"
                            className="transition-all duration-200 group-hover:scale-105"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > (index === 0 ? 5 : 3) && (
                          <Badge variant="secondary" className="opacity-60">
                            +{post.tags.length - (index === 0 ? 5 : 3)}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Read more indicator */}
                      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-gold transition-colors">
                        <span>Read the scroll</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Footer message - Enhanced */}
        {posts.length > 0 && (
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-6">
              {/* Decorative divider */}
              <div className="flex items-center gap-6">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gold/30" />
                <div className="p-3 rounded-full border-2 border-gold/20 bg-void-surface">
                  <Feather className="h-5 w-5 text-gold/60" />
                </div>
                <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-gold/30" />
              </div>
              
              <div className="space-y-2">
                <p className="text-muted-foreground text-base">
                  <span className="font-mono text-gold">{posts.length}</span> scroll{posts.length !== 1 ? 's' : ''} preserved in the archive
                </p>
                <p className="text-sm text-muted-foreground/50 italic">
                  More wisdom awaits those who seek it...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
