import { createRequire } from 'module';

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || '.next',
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pixabay.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing-welcome',
        permanent: false,
      },
    ];
  },
  webpack(config) {
    try {
      // Conditionally add the component-tagger loader only if it's installed.
      const require = createRequire(import.meta.url);
      require.resolve('@dhiwise/component-tagger/nextLoader');
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: '@dhiwise/component-tagger/nextLoader',
        }],
      });
    } catch (e) {
      // loader not available — skip adding the rule to avoid module-not-found errors
    }

    return config;
  },
};

export default nextConfig;