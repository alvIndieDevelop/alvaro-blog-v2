const options = {
  APP: {
    SEO: {
      DEFAULT_TITLE: "Alvaro Martin Caballero - Developer, Writer, Creator",
      DEFAULT_DESCRIPTION:
        "Personal portfolio, blog, and digital products by Your Name. Discover my projects, read my thoughts, and explore my digital creations.",
      DEFAULT_URL: "https://alvaro-blog.netlify.app/",
    },
  },
  NOTION: {
    ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN,
    BLOG_DATABASE_ID: process.env.NOTION_BLOG_DATABASE_ID,
  },
  GOOGLE: {
    ANALYTICS: {
      TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    },
  },
};

export default options;
