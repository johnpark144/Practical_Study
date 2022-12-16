export { default } from "next-auth/middleware";

// 로그인 안된상태에서 '/'페이지로 갔을때 [...nextauth]에 지정해둔 페이지로감
export const config = { matcher: ["/"] };  