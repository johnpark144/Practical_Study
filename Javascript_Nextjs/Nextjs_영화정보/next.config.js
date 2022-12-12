/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contact/:path*",    // 기존 주소 (:는 아무문자나, *는 뒤에 모든것을 캐치함)
        destination: "/form/:path*",    // 리디렉트할 주소
        permanent: false,
      },
    ]
  },

  async rewrites(){
    return [
      {
        source: "/api/movies",    // 기존 주소
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`    // 가져올 정보의 주소(즉 API_KEY를 보이지 않고 정보가져오기 가능)
      },
      {
        source:"/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`  
      }
    ]
  }
}

module.exports = nextConfig
