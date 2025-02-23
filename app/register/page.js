"use client";
import { signIn } from "next-auth/react";
import Navbar from "../components/navbar";
import Link from "next/link";

export default function Register() {
  return (
    <div>
      <Navbar />
      <main className="p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <button
          onClick={() => signIn("google")}
          className="btn btn-primary w-full"
        >
          Sign up with Google
        </button>
        <p className="mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Login here
          </Link>
        </p>
      </main>
    </div>
  );
}
