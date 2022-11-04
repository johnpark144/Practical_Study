
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// index.html
<!-- Tailwind css -->
 <link href="/dist/output.css" rel="stylesheet">
   
// postcss.config.js 설정 (아무수정 안해줘도됨)
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
 
//  tailwind.config.js 설정
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
