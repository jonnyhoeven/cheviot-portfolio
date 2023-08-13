"use server";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function HeaderBar() {
  const supabase = createServerComponentClient({ cookies });
  const { data: menuitems } = await supabase
    .from("menuitems")
    .select("id, link_text, link_url, link_target")
    .order("sort_index")
    .eq("category", "header");

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
          🔥
        </Link>
        {menuitems?.map((menuitem) => (
          <div className="flex">
            <Link href={menuitem.link_url} target={menuitem.link_target}>
              {menuitem.link_text}
            </Link>
          </div>
        ))}
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
