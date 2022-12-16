/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "links.papareact.com",
      "play-lh.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
    ], // 특정 도메인으로 이미지컴포넌트 사용가능 하게
  },
  experimental: {
    appDir: true, // app 폴더를 사용가능하게(nextjs13)
  },
};
