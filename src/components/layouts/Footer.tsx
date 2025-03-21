import Link from "next/link";
import { Button } from "../ui/button";
import { Github, Twitter, Linkedin } from "lucide-react";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  // { name: "Products", href: "/products" },
  // { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Alvaro Blog!</h3>
            <p className="text-sm text-muted-foreground">
              Developer, writer, and creator building digital products and
              sharing knowledge.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div></div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Social</h4>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Link href="https://github.com/alvIndieDevelop" target="_blank">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Link href="https://x.com/AlvaroMartinC11" target="_blank">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Link
                  href="https://www.linkedin.com/in/alvindie/"
                  target="_blank"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Alvaro Martin Caballero. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
