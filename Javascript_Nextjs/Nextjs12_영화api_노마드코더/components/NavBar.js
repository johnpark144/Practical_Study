import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();   // 현재 route를 알수있음
  return (
    <nav>
      <img src="vercel.svg" /> {/* public 폴더가 baseDir */}
      <div>
        <Link href="/">
          <span className={router.pathname === "/" ? "active" : ""}>Home</span>
        </Link>
        <Link href="/about">
          <span className={router.pathname === "/about" ? "active" : ""}>
            About
          </span>
        </Link>
      </div>

{/* 스타일 컴포넌트 */}
      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav span {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}

export default NavBar;
