"use client";
import { signIn } from "next-auth/react";
import Navbar from "../components/navbar";
import Link from "next/link";

export default function Login() {
  return (
    <div>
      <Navbar />
      <main className="p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <button
          onClick={() => signIn("google")}
          className="btn btn-primary w-full"
        >
          Sign in with Google
        </button>
        <p className="mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500">
            Register here
          </Link>
        </p>
      </main>
    </div>
  );
}
