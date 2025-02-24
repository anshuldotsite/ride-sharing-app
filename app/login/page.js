"use client";
import { signIn } from "next-auth/react";
import Navbar from "../components/navbar";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc"; // Google icon

export default function Login() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col p-8 max-w-md w-full bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center space-x-3 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-semibold text-lg">Sign in with Google</span>
          </button>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Dont have an account?{" "}
            <Link href="/register"  className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
