const withPWA = require("next-pwa");

module.exports = withPWA({
    async rewrites() {
        return [
            {
                source: '/:any*',
                destination: '/',
            },
        ];
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
    },
})

