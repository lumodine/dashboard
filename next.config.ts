/** @type {import("next").NextConfig} */
const nextConfig = {
  useFileSystemPublicRoutes: true,
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "cdn.lumodine.com",
      },
    ],
  },
}

export default nextConfig
