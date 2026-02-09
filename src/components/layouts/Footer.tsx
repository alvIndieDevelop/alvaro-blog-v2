import Link from "next/link";
import { Button } from "../ui/button";
import { Github, Twitter, Linkedin, Sword } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-gold/20 bg-void">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded border border-gold/30 bg-gold/10">
              <Sword className="h-3 w-3 text-gold" />
            </div>
            <span className="font-display text-sm">
              <span className="text-gold">Alvaro</span>
              <span className="text-muted-foreground">'s Sanctum</span>
            </span>
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center gap-1">
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 text-muted-foreground hover:text-gold hover:bg-gold/10" 
              asChild
            >
              <Link href="https://x.com/AlvaroMartinC11" target="_blank" aria-label="Twitter/X">
                <Twitter className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 text-muted-foreground hover:text-gold hover:bg-gold/10" 
              asChild
            >
              <Link href="https://www.linkedin.com/in/alvindie/" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* Copyright & Tagline */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Alvaro Martin Caballero
            </p>
            <p className="mt-1 text-xs text-muted-foreground/60 italic">
              "Code is my craft, games are my passion"
            </p>
          </div>
          
          {/* Decorative element */}
          <div className="flex items-center gap-2 text-gold/30">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gold/30" />
            <span className="text-xs">⚔️</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
