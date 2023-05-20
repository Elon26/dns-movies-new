/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    images: {
        domains: [
            "thumbs.dfs.ivi.ru",
            "zetflis.online",
            "static.okko.tv",
            "kinopoiskapiunofficial.tech",
            "avatars.mds.yandex.net",
            "youtu.be"
        ]
    }
};

module.exports = nextConfig;
