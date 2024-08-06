/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    transpilePackages: ["@fileown/api"],
    experimental: {
        serverComponentsExternalPackages: [
            "libsql",
        ]
    }
};

export default nextConfig;
