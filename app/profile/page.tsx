"use server";
import Link from "next/link";
import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = user?.id;
  const avaUrl = user?.user_metadata?.avatar_url;
  const fullName = user?.user_metadata?.full_name || user?.email;
  const provider = user?.app_metadata?.provider || "supabase";
  const lastSignInAt = user?.last_sign_in_at
    ? formatDistanceToNow(new Date(user?.last_sign_in_at))
    : "never";
  function avaImage({ avaUrl = "", fullName = "" }) {
    return (
      <img
        className="w-20 h-20 shadow-md border-4 border-gray-900 dark:border-gray-100 rounded-full"
        src={avaUrl}
        alt={fullName}
      />
    );
  }
  return (
    <div>
      {id ? (
        <div className="w-full flex justify-center items-center h-screen dark:text-white gap-5">
          <div className="flex-3 gap-10">
            <div className="text-3xl pb-3">Welcome!</div>
            <div>{avaUrl && avaImage({ avaUrl, fullName })}</div>
            <div className="pt-3">{fullName}</div>
          </div>
          <div className="shadow-xl border-2 p-2">
            <div className="text-xs align-bottom">
              Logged in {lastSignInAt} ago via{" "}
              <span className="text-xs capitalize"> {provider}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-screen dark:text-white gap-5">
          <div className="text-3xl">Hi!</div>
          <div>You are currently logged out.</div>
          <Link
            href="/login"
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
