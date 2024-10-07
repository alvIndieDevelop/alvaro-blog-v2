/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["www.notion.so"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.notion.so",
        port: "", // Dejar en blanco si no hay un puerto específico
        pathname: "/**", // El "**" permite cargar imágenes desde cualquier ruta de este dominio
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
