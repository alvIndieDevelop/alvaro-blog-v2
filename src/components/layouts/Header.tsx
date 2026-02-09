"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Menu, X, Sun, Moon, Github, Sword, Map, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { realms, navigationRealms, type RealmId } from "@/lib/realms";
import { cn } from "@/lib/utils";

// Navigation items with realm mapping
const navigation = [
  { name: "About", href: "/about", icon: User, realm: null },
  { name: "Forge", href: "/forge", icon: realms.forge.icon, realm: "forge" as RealmId },
  { name: "Workshop", href: "/workshop", icon: realms.workshop.icon, realm: "workshop" as RealmId },
  { name: "Tavern", href: "/tavern", icon: realms.tavern.icon, realm: "tavern" as RealmId },
  { name: "Library", href: "/library", icon: realms.library.icon, realm: "library" as RealmId },
];

// Get realm color for nav item
function getRealmNavColor(realm: RealmId | null, isActive: boolean) {
  if (!realm) return isActive ? "text-gold" : "text-muted-foreground hover:text-gold";
  
  const colors: Record<RealmId, { active: string; hover: string }> = {
    sanctum: { active: "text-gold", hover: "hover:text-gold" },
    forge: { active: "text-ember", hover: "hover:text-ember" },
    workshop: { active: "text-ethereal", hover: "hover:text-ethereal" },
    tavern: { active: "text-amber-500", hover: "hover:text-amber-500" },
    library: { active: "text-blue-500", hover: "hover:text-blue-500" },
    map: { active: "text-gold", hover: "hover:text-gold" },
  };

  return isActive ? colors[realm].active : `text-muted-foreground ${colors[realm].hover}`;
}

// Get underline color for nav item
function getUnderlineColor(realm: RealmId | null) {
  if (!realm) return "via-gold";
  
  const colors: Record<RealmId, string> = {
    sanctum: "via-gold",
    forge: "via-ember",
    workshop: "via-ethereal",
    tavern: "via-amber-500",
    library: "via-blue-500",
    map: "via-gold",
  };

  return colors[realm];
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Check if current path matches a realm
  const isPathActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-void/95 backdrop-blur-md supports-[backdrop-filter]:bg-void/80">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-xl font-display font-bold text-foreground transition-colors hover:text-gold"
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/30 bg-gold/10"
          >
            <Sword className="h-4 w-4 text-gold" />
          </motion.div>
          <span className="hidden sm:inline">
            <span className="text-gold">Alvaro</span>
            <span className="text-muted-foreground">'s Sanctum</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = isPathActive(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative px-4 py-2 text-sm font-medium transition-colors",
                  getRealmNavColor(item.realm, isActive)
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={cn(
                    "h-4 w-4 transition-opacity",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )} />
                  {item.name}
                </span>
                {/* Hover/Active underline effect */}
                <motion.span
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent to-transparent",
                    getUnderlineColor(item.realm),
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            );
          })}
          
          {/* Map Link */}
          <Link
            href="/map"
            className={cn(
              "group relative px-3 py-2 text-sm font-medium transition-colors",
              isPathActive("/map") ? "text-gold" : "text-muted-foreground hover:text-gold"
            )}
          >
            <Map className="h-4 w-4" />
          </Link>
          
          {/* Divider */}
          <div className="mx-2 h-6 w-[1px] bg-border" />
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative h-9 w-9 text-muted-foreground hover:text-gold hover:bg-gold/10"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {/* GitHub Link */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 text-muted-foreground hover:text-gold hover:bg-gold/10"
            asChild
          >
            <Link href="https://github.com/alvIndieDevelop" target="_blank" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 text-muted-foreground hover:text-gold"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-9 w-9 text-muted-foreground hover:text-gold"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gold/10 bg-void-surface md:hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = isPathActive(item.href);
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                        isActive 
                          ? cn(
                              "bg-opacity-10",
                              item.realm === 'forge' && "bg-ember/10 text-ember",
                              item.realm === 'workshop' && "bg-ethereal/10 text-ethereal",
                              item.realm === 'tavern' && "bg-amber-500/10 text-amber-500",
                              item.realm === 'library' && "bg-blue-500/10 text-blue-500",
                              !item.realm && "bg-gold/10 text-gold"
                            )
                          : "text-muted-foreground hover:bg-gold/10 hover:text-gold"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                      {item.realm && (
                        <span className="ml-auto text-xs opacity-60">
                          {realms[item.realm].name}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Map Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigation.length * 0.05 }}
              >
                <Link
                  href="/map"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                    isPathActive("/map")
                      ? "bg-gold/10 text-gold"
                      : "text-muted-foreground hover:bg-gold/10 hover:text-gold"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Map className="h-5 w-5" />
                  <span className="font-medium">Realm Map</span>
                </Link>
              </motion.div>
              
              {/* Divider */}
              <div className="my-2 h-[1px] bg-border" />
              
              {/* Mobile GitHub Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navigation.length + 1) * 0.05 }}
              >
                <Link
                  href="https://github.com/alvIndieDevelop"
                  target="_blank"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-colors hover:bg-gold/10 hover:text-gold"
                  onClick={() => setIsOpen(false)}
                >
                  <Github className="h-5 w-5" />
                  <span className="font-medium">GitHub</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
