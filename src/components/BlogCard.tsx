import { BlogPost } from "@/@types/schema";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="card overflow-hidden bg-neutral">
      <Link href={`/blog/${post.slug}`}>
        <img
          src={post.cover}
          alt={`Cover image for ${post.title}`}
          className="w-full h-44 object-cover bg-gray-200"
        />
      </Link>
      <div className="card-body">
        <h2 className="card-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-gray-500 truncate">{post.description}</p>
        <p className="">{post.date}</p>
        <div className="card-actions">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-blue-800 rounded-2xl px-5 py-1 text-gray-300 font-bold underline"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
