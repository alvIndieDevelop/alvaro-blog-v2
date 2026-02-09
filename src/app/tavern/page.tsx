import type { Metadata } from "next";
import { RealmLayout, RealmHero, RealmSectionHeader } from "@/components/layouts/RealmLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Beer, Heart, BookOpen, Music, Film, Gamepad2, Coffee, Users, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Tavern | Personal Life",
  description: "A cozy corner for personal stories, hobbies, and the things that make life interesting.",
};

// Sample personal content
const tales = [
  {
    id: "1",
    title: "My Journey into Game Development",
    description: "How a childhood love for video games turned into a passion for creating them.",
    mood: "reflective",
    date: "2024-01-15",
    readTime: "5 min",
  },
  {
    id: "2",
    title: "Learning Japanese: Month 6 Update",
    description: "Progress, struggles, and the joy of understanding anime without subtitles.",
    mood: "excited",
    date: "2024-01-10",
    readTime: "3 min",
  },
];

const hobbies = [
  {
    title: "Gaming",
    description: "RPGs, roguelikes, and anything with a good story",
    icon: Gamepad2,
    color: "text-ethereal",
  },
  {
    title: "Reading",
    description: "Sci-fi, fantasy, and technical books",
    icon: BookOpen,
    color: "text-amber-500",
  },
  {
    title: "Music",
    description: "Lo-fi, game soundtracks, and ambient",
    icon: Music,
    color: "text-purple-400",
  },
  {
    title: "Movies & Anime",
    description: "Studio Ghibli, sci-fi, and cyberpunk",
    icon: Film,
    color: "text-ember",
  },
];

const favorites = {
  games: ["Elden Ring", "Hollow Knight", "Zelda: TOTK", "Hades", "Celeste"],
  books: ["Dune", "Neuromancer", "The Pragmatic Programmer", "Clean Code"],
  anime: ["Cowboy Bebop", "Steins;Gate", "Attack on Titan", "Mob Psycho 100"],
};

// Mood indicator
function MoodIndicator({ mood }: { mood: string }) {
  const moodConfig: Record<string, { emoji: string; label: string }> = {
    happy: { emoji: "😊", label: "Happy" },
    reflective: { emoji: "🤔", label: "Reflective" },
    excited: { emoji: "🎉", label: "Excited" },
    casual: { emoji: "☕", label: "Casual" },
  };

  const config = moodConfig[mood] || moodConfig.casual;

  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
}

export default function TavernPage() {
  return (
    <RealmLayout realm="tavern">
      <RealmHero
        realm="tavern"
        badge="Personal Corner"
        title="The"
        titleAccent="Tavern"
        description="Pull up a chair and stay a while. This is where I share personal stories, hobbies, and the things that bring joy to life beyond code."
      >
        {/* Welcome message */}
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-void-surface/50 border border-amber-500/20 backdrop-blur-sm">
          <Coffee className="h-5 w-5 text-amber-500" />
          <span className="text-muted-foreground">Welcome, traveler. Make yourself at home.</span>
        </div>
      </RealmHero>

      <div className="container mx-auto px-4 py-16">
        {/* Tales Section */}
        <RealmSectionHeader
          realm="tavern"
          icon={<MessageCircle className="h-5 w-5 text-amber-500" />}
          title="Tales from the Road"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {tales.map((tale) => (
            <Card
              key={tale.id}
              variant="default"
              className="group border-amber-500/20 hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <MoodIndicator mood={tale.mood} />
                  <span className="text-xs text-muted-foreground">{tale.readTime} read</span>
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
                    {new Date(tale.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <Button size="sm" variant="ghost" className="text-amber-500 hover:text-amber-400">
                    Read Tale →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hobbies Section */}
        <div className="mt-20">
          <RealmSectionHeader
            realm="tavern"
            icon={<Heart className="h-5 w-5 text-amber-500" />}
            title="Hobbies & Interests"
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
            title="Current Favorites"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {/* Games */}
            <Card variant="default" className="border-amber-500/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-ethereal" />
                  <CardTitle className="text-lg">Games</CardTitle>
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
                  <CardTitle className="text-lg">Books</CardTitle>
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
            title="Join the Community"
          />

          <Card variant="parchment" className="p-8 border-amber-500/30 text-center">
            <Beer className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="font-display text-2xl text-amber-500 mb-4">Let's Connect!</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Whether you want to chat about games, share book recommendations, or just say hi - I'd love to hear from you.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-void">
                <MessageCircle className="h-4 w-4 mr-2" />
                Say Hello
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
