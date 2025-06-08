/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable middleware functionality
  // If you need static export, consider using dynamic imports for auth components
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    // Enable optimization for better performance
    domains: ['img.youtube.com', 'i.ytimg.com'], // Allow YouTube thumbnails
  },
};

module.exports = nextConfig;
