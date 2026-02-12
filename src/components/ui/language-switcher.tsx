"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Button } from "./button";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "buttons" | "dropdown" | "minimal";
  className?: string;
}

export function LanguageSwitcher({
  variant = "buttons",
  className,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  if (variant === "minimal") {
    // Just show the other language as a link
    const otherLocale = locale === "en" ? "es" : "en";
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale(otherLocale)}
        className={cn(
          "h-9 gap-2 text-muted-foreground hover:text-gold hover:bg-gold/10",
          className
        )}
        title={t("switchTo", { language: t(otherLocale) })}
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-medium uppercase">{otherLocale}</span>
      </Button>
    );
  }

  // Default: show both languages as buttons
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {routing.locales.map((loc) => (
        <Button
          key={loc}
          variant="ghost"
          size="sm"
          onClick={() => switchLocale(loc)}
          className={cn(
            "h-8 w-8 p-0 text-xs font-medium uppercase",
            locale === loc
              ? "text-gold bg-gold/10"
              : "text-muted-foreground hover:text-gold hover:bg-gold/10"
          )}
          title={t(loc)}
        >
          {loc}
        </Button>
      ))}
    </div>
  );
}
