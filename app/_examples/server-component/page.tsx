// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function ServerComponent() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies });

  // This assumes you have a `todos` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "title, content, image_url, image_alt, link_url, link_text, created_at"
    );

  return (
    <pre>
      Data: {JSON.stringify(posts, null, 2)}
      <br />
      Error: {JSON.stringify(error, null, 2)}
    </pre>
  );
}
