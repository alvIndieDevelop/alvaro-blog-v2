import { BlogPost } from "@/@types/schema";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <Link href={`/blog/${post.slug}`}>
        <img
          src={post.cover}
          alt={`Cover image for ${post.title}`}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-medium">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-gray-500 text-sm mt-2 h-16 overflow-hidden truncate">
          {post.description}
        </p>
        <p className="text-gray-500 text-sm mt-2">{post.date}</p>
        <span>
          {post.tags.map((tag) => (
            <span key={tag.id}>#{tag.name}</span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
