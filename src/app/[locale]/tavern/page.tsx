import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RealmLayout, RealmHero, RealmSectionHeader } from "@/components/layouts/RealmLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Beer, Heart, BookOpen, Music, Film, Gamepad2, Coffee, Users, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getAllTales, type TavernTaleMeta, type TavernMood } from "@/lib/tavern";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tavern" });
  
  return {
    title: `${t("title")} | ${t("pageTitle")}`,
    description: t("heroDescription"),
  };
}

// Mood indicator component
function MoodIndicator({ mood, locale }: { mood: TavernMood; locale: string }) {
  const moodConfig: Record<TavernMood, { emoji: string; labelEn: string; labelEs: string }> = {
    happy: { emoji: "😊", labelEn: "Happy", labelEs: "Feliz" },
    reflective: { emoji: "🤔", labelEn: "Reflective", labelEs: "Reflexivo" },
    excited: { emoji: "🎉", labelEn: "Excited", labelEs: "Emocionado" },
    casual: { emoji: "☕", labelEn: "Casual", labelEs: "Casual" },
  };

  const config = moodConfig[mood] || moodConfig.casual;

  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <span>{config.emoji}</span>
      <span>{locale === "es" ? config.labelEs : config.labelEn}</span>
    </span>
  );
}

// Tale card component
function TaleCard({ tale, locale, readMoreText }: { tale: TavernTaleMeta; locale: string; readMoreText: string }) {
  return (
    <Link href={`/tavern/tales/${tale.slug}`}>
      <Card
        variant="default"
        className="group border-amber-500/20 hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 h-full"
      >
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <MoodIndicator mood={tale.mood} locale={locale} />
            <span className="text-xs text-muted-foreground">{tale.readingTime}</span>
          </div>
          
          <CardTitle className="text-xl group-hover:text-amber-500 transition-colors">
            {tale.title}
          </CardTitle>
          
          <CardDescription className="line-clamp-2">
            {tale.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {new Date(tale.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-sm text-amber-500 group-hover:text-amber-400">
              {readMoreText} →
            </span>
          </div>
          
          {/* Tags */}
          {tale.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tale.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="text-xs border-amber-500/30 text-amber-500/80"
                >
                  {tag}
                </Badge>
              ))}
              {tale.tags.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-xs border-amber-500/30 text-amber-500/80"
                >
                  +{tale.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default async function TavernPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tavern" });
  
  // Get tales from content directory
  const tales = getAllTales(locale);

  const hobbies = [
    {
      title: locale === "es" ? "Videojuegos" : "Gaming",
      description: locale === "es" ? "RPGs, roguelikes y cualquier cosa con buena historia" : "RPGs, roguelikes, and anything with a good story",
      icon: Gamepad2,
      color: "text-ethereal",
    },
    {
      title: locale === "es" ? "Lectura" : "Reading",
      description: locale === "es" ? "Ciencia ficción, fantasía y libros técnicos" : "Sci-fi, fantasy, and technical books",
      icon: BookOpen,
      color: "text-amber-500",
    },
    {
      title: locale === "es" ? "Música" : "Music",
      description: locale === "es" ? "Lo-fi, bandas sonoras de juegos y ambient" : "Lo-fi, game soundtracks, and ambient",
      icon: Music,
      color: "text-purple-400",
    },
    {
      title: locale === "es" ? "Películas y Anime" : "Movies & Anime",
      description: locale === "es" ? "Studio Ghibli, ciencia ficción y cyberpunk" : "Studio Ghibli, sci-fi, and cyberpunk",
      icon: Film,
      color: "text-ember",
    },
  ];

  const favorites = {
    games: ["Elden Ring", "Hollow Knight", "Zelda: TOTK", "Hades", "Celeste"],
    books: ["Dune", "Neuromancer", "The Pragmatic Programmer", "Clean Code"],
    anime: ["Cowboy Bebop", "Steins;Gate", "Attack on Titan", "Mob Psycho 100"],
  };

  return (
    <RealmLayout realm="tavern">
      <RealmHero
        realm="tavern"
        badge={t("badge")}
        title={t("heroTitle")}
        titleAccent={t("heroAccent")}
        description={t("heroDescription")}
      >
        {/* Welcome message */}
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-void-surface/50 border border-amber-500/20 backdrop-blur-sm">
          <Coffee className="h-5 w-5 text-amber-500" />
          <span className="text-muted-foreground">
            {locale === "es" 
              ? "Bienvenido, viajero. Siéntete como en casa."
              : "Welcome, traveler. Make yourself at home."}
          </span>
        </div>
      </RealmHero>

      <div className="container mx-auto px-4 py-16">
        {/* Tales Section */}
        <RealmSectionHeader
          realm="tavern"
          icon={<MessageCircle className="h-5 w-5 text-amber-500" />}
          title={t("sectionTitle")}
        />

        {tales.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {tales.map((tale) => (
              <TaleCard key={tale.slug} tale={tale} locale={locale} readMoreText={t("readMore")} />
            ))}
          </div>
        ) : (
          <Card variant="default" className="border-amber-500/20 p-8 text-center">
            <MessageCircle className="h-12 w-12 text-amber-500/50 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {t("noTales")}
            </p>
          </Card>
        )}

        {/* Hobbies Section */}
        <div className="mt-20">
          <RealmSectionHeader
            realm="tavern"
            icon={<Heart className="h-5 w-5 text-amber-500" />}
            title={locale === "es" ? "Hobbies e Intereses" : "Hobbies & Interests"}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {hobbies.map((hobby) => {
              const Icon = hobby.icon;
              return (
                <Card
                  key={hobby.title}
                  variant="default"
                  className="border-amber-500/20 hover:border-amber-500/40 transition-colors text-center"
                >
                  <CardHeader>
                    <div className={`mx-auto p-4 rounded-full bg-void-surface border border-amber-500/20 ${hobby.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg mt-4">{hobby.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {hobby.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Favorites Section */}
        <div className="mt-20">
          <RealmSectionHeader
            realm="tavern"
            icon={<Sparkles className="h-5 w-5 text-amber-500" />}
            title={locale === "es" ? "Favoritos Actuales" : "Current Favorites"}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {/* Games */}
            <Card variant="default" className="border-amber-500/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-ethereal" />
                  <CardTitle className="text-lg">{locale === "es" ? "Juegos" : "Games"}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {favorites.games.map((game, i) => (
                    <li key={game} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-gold">{i + 1}.</span>
                      {game}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Books */}
            <Card variant="default" className="border-amber-500/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-lg">{locale === "es" ? "Libros" : "Books"}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {favorites.books.map((book, i) => (
                    <li key={book} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-gold">{i + 1}.</span>
                      {book}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Anime */}
            <Card variant="default" className="border-amber-500/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Film className="h-5 w-5 text-ember" />
                  <CardTitle className="text-lg">Anime</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {favorites.anime.map((anime, i) => (
                    <li key={anime} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-gold">{i + 1}.</span>
                      {anime}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Section */}
        <div className="mt-20">
          <RealmSectionHeader
            realm="tavern"
            icon={<Users className="h-5 w-5 text-amber-500" />}
            title={locale === "es" ? "Únete a la Comunidad" : "Join the Community"}
          />

          <Card variant="parchment" className="p-8 border-amber-500/30 text-center">
            <Beer className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="font-display text-2xl text-amber-500 mb-4">
              {locale === "es" ? "¡Conectemos!" : "Let's Connect!"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {locale === "es"
                ? "Ya sea que quieras hablar de juegos, compartir recomendaciones de libros o simplemente saludar - me encantaría saber de ti."
                : "Whether you want to chat about games, share book recommendations, or just say hi - I'd love to hear from you."}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-void">
                <MessageCircle className="h-4 w-4 mr-2" />
                {locale === "es" ? "Saludar" : "Say Hello"}
              </Button>
              <Button size="lg" variant="outline" className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10">
                <Users className="h-4 w-4 mr-2" />
                Discord
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </RealmLayout>
  );
}
