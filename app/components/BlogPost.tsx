import React from "react";
import Link from "next/link";

export default async function BlogPost({
  post = { slug: "", title: "", subtitle: "", intro: "" },
}) {
  return (
    <div className="flex justify-between px-4 mx-auto max-w-screen-xl mb-6">
      <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <header className="mb-4 lg:mb-6 not-format">
          <Link href={"/blog/" + post.slug}>
            <h1 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {post.title}
            </h1>
            <h3 className="mb-4 text-1xl leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
              {post.subtitle}
            </h3>
          </Link>
        </header>
        <p className="lead">{post.intro}</p>
      </article>
    </div>
  );
}
