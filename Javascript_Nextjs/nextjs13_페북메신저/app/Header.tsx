import Image from "next/image";
import Link from "next/link";
import LoggoutButton from './LoggoutButton';
import { unstable_getServerSession } from 'next-auth';

async function Header() { // nextjs13에선 Header가 예약어로 되있어서 Header라는 페이지가 만들어지지 않음
    const session = await unstable_getServerSession();

    if (session)
      return (  // 로그인후 헤더
        <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
          <div className="flex space-x-2">
            <Image
              className="rounded-full mx-2 object-contain"
              height={10}
              width={50}
              src={session.user?.image!}  // 로그인한 유저의 페북이미지
              alt="Profile picture"
            />

            <div>
              <p className="text-blue-400">Logged in as:</p>
              <p className="font-bold text-lg">{session.user?.name}</p> {/* 로그인한 유저의 페북 유저이름 */}
            </div>
          </div>
          <LoggoutButton />
        </header>
      );

  return (  // 로그인하기전 헤더 
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            src="http://links.papareact.com/jne"
            height={10}
            width={50}
            alt="Logo"
          />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>
        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          sign in
        </Link>
      </div>
    </header>
  );
}

export default Header;
