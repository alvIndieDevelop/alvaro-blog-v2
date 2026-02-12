import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Scroll, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Quest Discontinued",
  description: "This quest line has been discontinued. Explore other adventures!",
};

export default function ServicesPage() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="text-center max-w-lg">
        {/* Warning icon */}
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/30">
          <AlertTriangle className="h-10 w-10 text-amber-500" />
        </div>

        {/* Status badge */}
        <div className="mb-4">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-sm font-medium">
            Quest Line Discontinued
          </span>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-4">
          Services Quest Retired
        </h1>
        <p className="text-muted-foreground mb-8">
          This quest line has been retired from active duty. The guild is focusing 
          on other adventures. Check out the available quests or explore the knowledge archive!
        </p>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2 min-w-[160px]">
            <Link href="/">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 min-w-[160px]">
            <Link href="/blog">
              <Scroll className="h-4 w-4" />
              Read Scrolls
            </Link>
          </Button>
        </div>
      </div>

      {/* Flavor text */}
      <p className="text-xs text-muted-foreground/60 italic mt-4">
        &quot;Some quests must end for new ones to begin.&quot;
      </p>
    </div>
  );
}
