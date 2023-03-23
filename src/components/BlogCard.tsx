import { BlogPost } from "@/@types/schema";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  console.log(post);
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <Link href={`/blog/${post.slug}`}>
        <img
          src={post.cover}
          alt={`Cover image for ${post.title}`}
          className="w-full object-cover h-48"
        />
      </Link>
      <div className="px-4 py-2">
        <h3 className="text-lg font-semibold mb-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4">{post.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-xs">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>
        <span className="block mt-2 space-x-4">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className={`bg-blue-800 text-white px-2 py-1 text-xs rounded-lg font-bold`}
            >
              #{tag.name}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
