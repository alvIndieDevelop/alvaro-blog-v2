import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getAllTaleSlugs, getTaleBySlug, type TavernMood } from "@/lib/tavern";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { NotTranslatedBanner } from "@/components/ui/not-translated-banner";
import ShareButtons from "@/components/ShareButtons";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import remarkGfm from "remark-gfm";
import { Beer, Clock, Calendar, User, ArrowLeft, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RealmLayout } from "@/components/layouts/RealmLayout";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllTaleSlugs();
  const locales = ["en", "es"];
  
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const tale = getTaleBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "tavern" });

  if (!tale) {
    return { title: t("noTales") };
  }

  return {
    title: `${tale.title} | ${t("title")}`,
    description: tale.description,
    openGraph: {
      title: tale.title,
      description: tale.description,
      type: "article",
      publishedTime: tale.date,
      authors: [tale.author],
      tags: tale.tags,
    },
  };
}

// Mood indicator with emoji
function MoodBadge({ mood, locale }: { mood: TavernMood; locale: string }) {
  const moodConfig: Record<TavernMood, { emoji: string; labelEn: string; labelEs: string; color: string }> = {
    happy: { emoji: "😊", labelEn: "Happy", labelEs: "Feliz", color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400" },
    reflective: { emoji: "🤔", labelEn: "Reflective", labelEs: "Reflexivo", color: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400" },
    excited: { emoji: "🎉", labelEn: "Excited", labelEs: "Emocionado", color: "bg-pink-500/10 border-pink-500/30 text-pink-600 dark:text-pink-400" },
    casual: { emoji: "☕", labelEn: "Casual", labelEs: "Casual", color: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400" },
  };

  const config = moodConfig[mood] || moodConfig.casual;
  const label = locale === "es" ? config.labelEs : config.labelEn;
  const moodText = locale === "es" ? "Estado de ánimo" : "Mood";

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.color}`}>
      <span>{config.emoji}</span>
      <span className="text-sm font-medium">{label} {moodText}</span>
    </div>
  );
}

export default async function TalePage({ params }: Props) {
  const { slug, locale } = await params;
  const tale = getTaleBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "tavern" });
  
  const dateLocale = locale === "es" ? es : enUS;

  if (!tale) {
    notFound();
  }

  // Translated strings
  const backToTavernText = locale === "es" ? "Volver a la Taberna" : "Back to the Tavern";
  const tavernTaleText = locale === "es" ? "Historia de la Taberna" : "Tavern Tale";
  const toldByText = locale === "es" ? "Contada por" : "Told by";
  const shareTaleText = locale === "es" ? "Compartir esta historia" : "Share this tale";
  const thanksText = locale === "es" 
    ? "🍺 Gracias por escuchar, viajero. Que tu viaje esté lleno de buenas historias."
    : "🍺 Thanks for listening, traveler. May your journey be filled with good stories.";
  const returnText = locale === "es" ? "Volver a la Taberna" : "Return to the Tavern";

  return (
    <RealmLayout realm="tavern">
      <div className="relative min-h-screen">
        {/* Background pattern */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

        <article className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Back to Tavern */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-amber-500">
              <Link href="/tavern">
                <ArrowLeft className="h-4 w-4" />
                {backToTavernText}
              </Link>
            </Button>
          </div>

          {/* Not translated banner */}
          {!tale.isTranslated && (
            <NotTranslatedBanner originalLocale={tale.locale} />
          )}

          {/* Tale Header */}
          <header className="mb-10 pb-8 border-b border-amber-500/20">
            {/* Tale badge and mood */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
                <Beer className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">{tavernTaleText}</span>
              </div>
              <MoodBadge mood={tale.mood} locale={locale} />
            </div>

            <h1 className="text-4xl font-bold mb-4 leading-tight">{tale.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{tale.description}</p>
            
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-500" />
                <time dateTime={tale.date}>
                  {format(new Date(tale.date), "MMMM d, yyyy", { locale: dateLocale })}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-500" />
                <span>{tale.readingTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-amber-500" />
                <span>{toldByText} {tale.author}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tale.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-amber-500/10 border-amber-500/30">
                  <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Tale Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-amber-500 prose-code:text-amber-500 prose-strong:text-foreground">
            <MDXRemote
              source={tale.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>

          {/* Tale Footer */}
          <footer className="mt-12 pt-8 border-t border-amber-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-amber-500" />
                  {shareTaleText}
                </h3>
                <ShareButtons
                  url={`https://alvaro-blog.netlify.app/tavern/tales/${slug}`}
                  title={tale.title}
                />
              </div>
              
              <div className="text-right">
                <p className="text-sm text-muted-foreground italic">
                  {thanksText}
                </p>
              </div>
            </div>

            {/* Back to tavern link */}
            <div className="mt-8 text-center">
              <Button variant="outline" asChild className="gap-2 border-amber-500/30 text-amber-500 hover:bg-amber-500/10">
                <Link href="/tavern">
                  <ArrowLeft className="h-4 w-4" />
                  {returnText}
                </Link>
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </RealmLayout>
  );
}
