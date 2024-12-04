/** @type {import("next").NextConfig} */
const nextConfig = {
  useFileSystemPublicRoutes: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.lumodine.com",
      },
    ],
  },
  output: "standalone",
}

export default nextConfig
