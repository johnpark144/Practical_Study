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


// ################## models/user.js       // mongoose를 이용한 데이터베이스 스키마인 Model 부분
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


// ################## app/api/auth/[...nextauth]/route.js     // Rest API로 OAuth 가입 혹은 로그인처리하기 및 세션 처리
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
        // 존재하지 않으면 모델에 있는 스키마에 맞게 MongoDB DB 유저 생성
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


// ################## Nav.jsx   // next-auth 사용하도록
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders(); // OAuth들의 Provider들을 담아 배열로 전달
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
                  Sign In With {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
  </nav>
  );
}

export default Nav;

// ############ 몽고DB(MongoDB) Create (POST요청) ##################################################################################################################################
// ################## create-prompt/page.jsx 
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import Link from "next/link";

function CreatePrompt() {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  // Post를 만들어 post형식으로 데이터를 백엔드에 저장시킴
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // submit 진행중

    try {
      const response = await fetch("/api/prompt/new", { // restAPI 서버에 데이터 생성을 위한 POST 방식으로 요청
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false); // submit중 단계에서 해제
    }
  };
  
  
  return (
    <section className="w-full max-w-full flex-start flex-col">
      {/* ~Post, 설명부분 */}
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* Post 부분 */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea "
          />
        </label>
        {/* Tag 부분 */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>
        {/* 취소, Submit */}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
export default CreatePrompt;


// ################## models/prompt.js       // mongoose를 이용한 데이터베이스 스키마인 Model 부분
import { Schema, model, models } from "mongoose";

// 데이터 형식(Model)
const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema); // 기존에 있는 데이터를 사용하거나, 스키마에 맞춰서 생성함

export default Prompt;


// ################## app/api/prompt/new/route.js
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json(); // POST요청으로 받은 데이터

  try {
    // DB연결
    await connectToDB();
    // prompt 모델에 스키마에 맞춰서, POST요청으로 받은 req의 데이터를 각각 객체로 만들어 DB에 저장
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save(); // 저장
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
