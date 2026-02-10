import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Map, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 h-12 w-12 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 h-12 w-12 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-8 left-8 h-12 w-12 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-8 right-8 h-12 w-12 border-r-2 border-b-2 border-primary/30" />

      <div className="text-center">
        {/* Lost icon */}
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 border-2 border-dashed border-muted-foreground/30">
          <Compass className="h-10 w-10 text-muted-foreground animate-pulse" />
        </div>

        {/* Error code styled as level */}
        <div className="mb-4">
          <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-medium">
            Error Level 404
          </span>
        </div>

        <h1 className="text-5xl font-bold text-foreground mb-2">
          Quest Not Found
        </h1>
        <h2 className="text-xl font-medium text-muted-foreground mb-4">
          You&apos;ve wandered into uncharted territory
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The path you seek doesn&apos;t exist in this realm, or perhaps it has been 
          moved to another dimension. Fear not, brave traveler!
        </p>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2 min-w-[160px]">
            <Link href="/">
              <Home className="h-4 w-4" />
              Return to Base
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 min-w-[160px]">
            <Link href="/projects">
              <Map className="h-4 w-4" />
              View Quest Log
            </Link>
          </Button>
        </div>
      </div>

      {/* Flavor text */}
      <p className="text-xs text-muted-foreground/60 italic mt-8">
        &quot;Not all who wander are lost... but you might be.&quot;
      </p>
    </div>
  );
}
