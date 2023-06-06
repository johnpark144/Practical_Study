// ################## 기본세팅 #####################################################################################################################################################
// npm i bcrypt mongodb mongoose next-auth    // bcrypt는 비밀번호 해시화

// 구글 API : console.cloud.google.com/
// MongoDB : https://www.mongodb.com/atlas
// nextauth : https://next-auth.js.org/

// ############ 구글 API로부터 clientId와 clientSecret 받기 :
New project --> 프로젝트 만들기 --> 메뉴 --> APIs & Services --> OAuth consent screen --> Create --> (Authorized domain은 사용할 도메인네임이라 처음엔 로컬호스트로) --> Create Credentials --> OAuth client ID --> (같은 URI 적기)

Authorized domain (로컬호스트 아니면 배포시 주소)
http://localhost:3000
http://localhost:3000/api/auth/callback/google     // 구글 OAuth 가능케함

// ############ 몽고디비(MongoDB) :
Create (cluster 만들기) --> Shared --> Create Cluster
프로젝트 생성 -> Connect -> drivers -> MONGODB_URI 코드를 가져옴
MONGODB_URI=mongodb+srv://vyckd354:<password>@cluster0.gctypic.mongodb.net/?retryWrites=true&w=majority

password 부분은 Database access부분에 비밀번호를 대체해서 넣기. 이와같이 -> mongodb+srv://vyckd354:O4Ivm4D3FSOTMnKi@cluster0.gctypic.mongodb.net/?retryWrites=true&w=majority

Network Access에서 내 ip주소 접근 가능하게 혹은 "0.0.0.0/0" 를 적어줌으로써 모든 ip에서 접근 가능하게

// ############ NextAuth :
NEXTAUTH_SECRET는 터미널에서 "openssl rand -base64 32" 를입력하여 만듬

// ############ Nextauth (구글 API)와 MongoDB 이용 ##################################################################################################################################
// ################## .env       // 환경변수
GOOGLE_ID=618808192814-ftuitgvbco5blhqnhb1vptjfg81rpcjv.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
MONGODB_URI=mongodb+srv://vyckd354:O4Ivm4D1FSOTMnKi@cluster0.gctypic.mongodb.net/?retryWrites=true&w=majority

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=8CTtlSFkAplFhZwChGdWGAAt8VIdA1ai4IZiFheI9nk=

// ################## provider.jsx       // 세션들을 provider안에 있는 children들에게 전달
"use client";
import { SessionProvider } from "next-auth/react";

function Provider({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;


// ################## page.jsx      // provider 감싸기
import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}


// ################## utils/database.js       // mongoose를 이용하여 MongoDB DB와 연결
import mongoose from "mongoose";

let isConneted = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  // mongoDB 이미 연결 되있는경우
  if (isConneted) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    // mongoDB 연결시킴
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConneted = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};


// ################## models/user.js       // 데이터베이스 스키마인 Model 부분
import { Schema, model, models } from "mongoose";

// 데이터 형식(Model)
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 4-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

 // 로그인 되있으면 로그인된 유저 계속해서 사용, 아니면 User 컬렉션에 아이디와 로그인 시켜서 사용
const User = models.User || model("User", UserSchema);

export default User;


// ################## app/api/auth/[...nextauth]/route.js     // Rest API로 만들기
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";  // 스키마(모델)
import { connectToDB } from "@utils/database";  // 데이터베이스

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // 세션에 이메일이 존재하면 (로그인 이미 되있으면),NextAuth의 session정보에 id를 넣어둠
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        // mongoDB Database에 mongoose로 연결
        await connectToDB();
        // 유저가 이미 존재하는지 확인
        const userExists = await User.findOne({
          email: profile.email,
        });
        // 존재하지 않으면 모델에 있는 스키마에 맞게 유저 생성
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };


// ################## next.config.js     // Nextjs 설정에 추가해주기 (수정 후 서버 다시 시작해줘야함)
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"], // mongoose로 외부 db와 연결
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;


// ################## Nav.jsx   // next-auth 사용
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders(); // 담고있는 OAuth들의 Provider들을 전달해줌
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="objext-cotain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* 데스크톱 네비게이션 */}
      <div className="sm:flex hidden">
        {session?.user ? (    // 세션에 유저가 있는지
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">  // 구글로 signOut 시킴
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image} // 기존 Oauth에서 쓰던 프로필사진
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}   // 구글로 signIn 하게함
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
  </nav>
  );
}

export default Nav;

