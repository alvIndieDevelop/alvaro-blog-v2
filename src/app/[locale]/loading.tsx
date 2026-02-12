import { Loader2, Sparkles } from "lucide-react";

const loadingMessages = [
  "Loading quest data...",
  "Gathering resources...",
  "Consulting the oracle...",
  "Preparing your adventure...",
  "Summoning content...",
];

export default function Loading() {
  // Pick a random message (will be consistent per render)
  const message = loadingMessages[0];

  return (
    <div className="relative flex min-h-[60vh] items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="flex flex-col items-center gap-6 text-center">
        {/* Animated loading icon */}
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
          
          {/* Main spinner container */}
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 border-2 border-primary/30">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>

          {/* Sparkle decorations */}
          <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-amber-500 animate-pulse" />
          <Sparkles className="absolute -bottom-1 -left-1 h-4 w-4 text-purple-500 animate-pulse delay-150" />
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground">{message}</p>
          <p className="text-sm text-muted-foreground">
            Please wait, adventurer...
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
