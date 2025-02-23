"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import DarkModeToggle from "./darkMode";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-black text-black dark:text-white">
      <div>
        <Link href="/" className="text-xl font-bold">
          RideShare
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {status === "loading" ? (
          <div>Loading...</div>
        ) : session ? (
          <>
            <span>Welcome, {session.user.name}</span>
            <Link href="/profile">Profile</Link>
            <Link href="/chat">Chat</Link>
            <button onClick={() => signOut()} className="btn btn-danger">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
        <DarkModeToggle />
      </div>
    </nav>
  );
}
