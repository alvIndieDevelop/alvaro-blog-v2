"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, Globe } from "lucide-react";

interface NotTranslatedBannerProps {
  originalLocale?: string;
}

export function NotTranslatedBanner({ originalLocale = "en" }: NotTranslatedBannerProps) {
  const t = useTranslations("blog");
  
  const localeNames: Record<string, string> = {
    en: "English",
    es: "Español",
  };

  return (
    <div className="mb-8 p-4 rounded-lg border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
          <Globe className="h-5 w-5 text-amber-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-amber-500">
              {t("notTranslated")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {originalLocale && (
              <span className="inline-flex items-center gap-1">
                <span className="text-amber-500/80">
                  ({localeNames[originalLocale] || originalLocale})
                </span>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
