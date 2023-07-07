"use server";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function HeaderBar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const avaUrl = user?.user_metadata?.avatar_url;
  const fullName = user?.user_metadata?.full_name || user?.email;
  function avaImage({ avaUrl = "", fullName = "" }) {
    return (
      <Link href="/profile">
        <img
          className="animate-in w-8 h-8 shadow-md border-2 border-gray-900 dark:border-gray-100 rounded-full hover:border-gray-700"
          src={avaUrl}
          alt={fullName}
        />
      </Link>
    );
  }
  return (
    <nav className="bg-gray-100  dark:bg-gray-600 w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        <Link href="/" className="wiggle-in text-4xl">
          🍒
        </Link>
        <div>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <LogoutButton />
              <div>{avaUrl && avaImage({ avaUrl, fullName })}</div>
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
