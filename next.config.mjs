/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Matches any path under this hostname
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**', // Matches any path under this hostname
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**', // Matches any path under this hostname
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**', // Matches any path under this hostname
      },
    ],
  },
};

export default nextConfig;
