import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { RealmLayout, RealmHero, RealmSectionHeader } from "@/components/layouts/RealmLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { Library, Scroll, BookOpen, Clock, Calendar, Sparkles, BookText, Feather, Star, Lightbulb, GraduationCap } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "library" });
  
  return {
    title: `${t("title")} | ${t("pageTitle")}`,
    description: t("heroDescription"),
  };
}

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "library" });
  
  const posts = getAllPosts(locale);
  const tags = getAllTags(locale);
  const dateLocale = locale === "es" ? es : enUS;

  return (
    <RealmLayout realm="library">
      <RealmHero
        realm="library"
        badge={t("badge")}
        title={t("heroTitle")}
        titleAccent={t("heroAccent")}
        description={t("heroDescription")}
      >
        {/* Stats */}
        <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-void-surface/50 border border-blue-600/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-600/20">
              <Scroll className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-left">
              <p className="font-mono text-2xl font-bold text-blue-500">{posts.length}</p>
              <p className="text-xs text-muted-foreground">{t("scrollsLabel")}</p>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-border" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10 border border-gold/20">
              <Sparkles className="h-5 w-5 text-gold" />
            </div>
            <div className="text-left">
              <p className="font-mono text-2xl font-bold text-gold">{tags.length}</p>
              <p className="text-xs text-muted-foreground">{t("domainsLabel")}</p>
            </div>
          </div>
        </div>
      </RealmHero>

      <div className="container mx-auto px-4 py-16">
        {/* Knowledge Domains (Tags) */}
        {tags.length > 0 && (
          <div className="mb-16">
            <RealmSectionHeader
              realm="library"
              icon={<Sparkles className="h-5 w-5 text-blue-500" />}
              title={t("knowledgeDomains")}
            />
            <div className="flex flex-wrap justify-center gap-3">
              {tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="seal"
                  className="cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/20 text-sm px-4 py-2"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Scrolls (Blog Posts) */}
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="relative inline-block mb-10">
              <div className="absolute -inset-6 rounded-full border border-blue-600/20 animate-pulse" />
              <div className="flex items-center justify-center w-28 h-28 rounded-full bg-void-surface border-2 border-blue-600/30">
                <BookOpen className="h-14 w-14 text-blue-500/50" />
              </div>
            </div>
            <p className="text-muted-foreground text-2xl mb-4 font-display">
              {t("archiveEmpty")}
            </p>
            <p className="text-muted-foreground/60 italic flex items-center justify-center gap-2">
              <Feather className="h-4 w-4" />
              {t("newScrollsWritten")}
            </p>
          </div>
        ) : (
          <>
            <RealmSectionHeader
              realm="library"
              icon={<BookText className="h-5 w-5 text-blue-500" />}
              title={t("sectionTitle")}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <Link key={post.slug} href={`/library/${post.slug}`}>
                  <Card 
                    variant={index === 0 ? "elevated" : "default"}
                    className={`group h-full hover:-translate-y-2 transition-all duration-300 border-blue-600/20 hover:border-blue-600/40 ${index === 0 ? "hover:shadow-2xl hover:shadow-blue-600/20 lg:col-span-2" : "hover:shadow-xl hover:shadow-blue-600/10"}`}
                  >
                    {/* Featured badge for first post */}
                    {index === 0 && (
                      <div className="absolute -top-3 left-6 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-void text-xs font-bold shadow-lg shadow-blue-600/30">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        {t("latestDiscovery")}
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      {/* Date and reading time */}
                      <div className="flex items-center justify-between mb-5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-void-surface/80 border border-border">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <time dateTime={post.date}>
                            {format(new Date(post.date), "MMMM d, yyyy", { locale: dateLocale })}
                          </time>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-void-surface/80 border border-border">
                          <Clock className="h-4 w-4 text-gold" />
                          <span>{post.readingTime}</span>
                        </div>
                      </div>
                      
                      <CardTitle className={`${index === 0 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} group-hover:text-blue-500 transition-colors line-clamp-2 flex items-start gap-4`}>
                        <div className={`p-3 rounded-xl bg-blue-600/10 border border-blue-600/20 group-hover:bg-blue-600/20 group-hover:border-blue-600/40 transition-all ${index === 0 ? "p-4" : ""}`}>
                          <Scroll className={`${index === 0 ? "h-7 w-7" : "h-5 w-5"} text-blue-500`} />
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
                      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-blue-500 transition-colors">
                        <span>{t("readScroll")}</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Content Types Section */}
        <div className="mt-20">
          <RealmSectionHeader
            realm="library"
            icon={<GraduationCap className="h-5 w-5 text-blue-500" />}
            title={t("contentTypes")}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: t("scrollsType"),
                description: t("scrollsTypeDesc"),
                icon: <Scroll className="h-8 w-8 text-blue-500" />,
                count: posts.length,
              },
              {
                title: t("tomesType"),
                description: t("tomesTypeDesc"),
                icon: <BookOpen className="h-8 w-8 text-gold" />,
                count: 0,
                comingSoon: true,
              },
              {
                title: t("ideasType"),
                description: t("ideasTypeDesc"),
                icon: <Lightbulb className="h-8 w-8 text-purple-400" />,
                count: 0,
                comingSoon: true,
              },
            ].map((type) => (
              <Card
                key={type.title}
                variant="default"
                className="border-blue-600/20 text-center relative"
              >
                {type.comingSoon && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="text-xs">{t("comingSoon")}</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="mx-auto mb-4">{type.icon}</div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-2xl font-bold text-blue-500">{type.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        {posts.length > 0 && (
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-blue-600/30" />
                <div className="p-3 rounded-full border-2 border-blue-600/20 bg-void-surface">
                  <Feather className="h-5 w-5 text-blue-500/60" />
                </div>
                <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-blue-600/30" />
              </div>
              
              <div className="space-y-2">
                <p className="text-muted-foreground text-base">
                  <span className="font-mono text-blue-500">{posts.length}</span>{" "}
                  {posts.length === 1 ? t("scrollsPreserved", { count: posts.length }) : t("scrollsPreservedPlural", { count: posts.length })}
                </p>
                <p className="text-sm text-muted-foreground/50 italic">
                  {t("knowledgeGrows")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </RealmLayout>
  );
}
