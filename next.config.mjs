/** @type {import('next').NextConfig} */
const nextConfig = {
    'poweredByHeader': false,
    'distDir': './dist',
    experimental: {
        esmExternals: 'loose',
        serverComponentsExternalPackages: ["mongoose"], 
      },

};

export default nextConfig;
