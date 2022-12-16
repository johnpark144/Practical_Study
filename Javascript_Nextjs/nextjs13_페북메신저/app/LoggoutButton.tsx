"use client";
import { signOut } from "next-auth/react";

function LoggoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      sign out
    </button>
  );
}

export default LoggoutButton;
