import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { format } from "date-fns";

function linkButton({ link_url = "", link_text = "" }) {
  return (
    <a
      href={link_url}
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    >
      {link_text + " "}
      <svg
        className="w-3 h-3 ml-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>
  );
}

export default async function HistoricTimeline() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies });

  // This assumes you have a `todos` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md

  async function getPosts() {
    return await supabase
      .from("posts")
      .select(
        "id, title, content, image_url, image_alt, link_url, link_text, created_at"
      )
      .eq("category", "timeline")
      .order("created_at", { ascending: false });
  }

  type PostsResponse = Awaited<ReturnType<typeof getPosts>>;
  type MoviesResponseSuccess = PostsResponse["data"];
  type MoviesResponseError = PostsResponse["error"];

  const { data: posts, error } = await getPosts();

  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700 mx-10 my-10">
      {posts &&
        posts.map(({ id, created_at, title, content, link_url, link_text }) => (
          <li key={id} className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {format(new Date(created_at), "MMMM yyyy")}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {content}
            </p>
            {link_url && link_text && linkButton({ link_url, link_text })}
          </li>
        ))}
    </ol>
  );
}
