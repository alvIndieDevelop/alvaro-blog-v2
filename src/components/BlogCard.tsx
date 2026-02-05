import { BlogPost } from "../@types/schema";
import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="transition hover:translate-y-[-2px] hover:shadow-lg overflow-hidden">
      <Link href={`/blog/${post.slug}`}>
        {post.cover && (
          <div className="relative h-48">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.date}</CardDescription>
          <CardDescription>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.description}
            </p>
          </CardDescription>
          <CardDescription>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}
