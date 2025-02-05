import React from "react";
import { BlogPost } from "../@types/schema";
import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="transition hover:translate-y-[-2px] hover:shadow-lg">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
          />
          {post.featured && (
            <div className="absolute top-2 right-2">
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                Destacado
              </span>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>

          <CardDescription>{post.date}</CardDescription>
          <CardDescription>
            <div className="py-2">
              <p className="text-muted-foreground mb-4">{post.description}</p>
            </div>
          </CardDescription>
          <CardDescription>
            <div className="flex flex-wrap gap-2 mb-3">
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
};

export default BlogCard;
