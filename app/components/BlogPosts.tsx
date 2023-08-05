import React from "react";
import BlogPost from "./BlogPost";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function BlogPosts() {
  const supabase = createServerComponentClient({ cookies });
  async function getPosts() {
    return await supabase
      .from("posts")
      .select(
        "slug, title, subtitle, intro, content, image_url, image_alt, link_url, link_text, created_at"
      )
      .eq("category", "blog")
      .order("created_at", { ascending: false });
  }
  const { data: posts, error } = await getPosts();

  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700 mx-10 my-10">
      {posts?.map((post) => (
        <BlogPost post={post} />
      ))}
    </ol>
  );
}
