"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function RecentActivityMessage() {
  const { data: session } = useSession();

  return (
    <p className="text-md cursor-pointer bg-white dark:bg-black text-black dark:text-white">
      {session ? (
        <Link href="/profile">Click here to see your recent activity</Link>
      ) : (
        <Link href="/login">Log in to see your recent activity</Link>
      )}
    </p>
  );
}
