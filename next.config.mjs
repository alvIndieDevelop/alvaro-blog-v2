import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable MDX pages
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "alphaxperience.io",
        port: "",
        pathname: "/**",
      },
    ],
    // Enable modern image formats for better performance
    formats: ["image/avif", "image/webp"],
  },
  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports for smaller bundles
    optimizePackageImports: ["lucide-react", "framer-motion", "date-fns", "react-icons"],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
