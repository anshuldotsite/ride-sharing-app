"use client";
import { signIn } from "next-auth/react";
import Navbar from "../components/navbar";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col p-4 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <button
            onClick={() => signIn("google")}
            className="btn btn-primary w-full"
          >
            Sign in with Google
          </button>
          <p className="mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
