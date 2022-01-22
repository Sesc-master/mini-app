const withPWA = require("next-pwa");

module.exports = withPWA({
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

