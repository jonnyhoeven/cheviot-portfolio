import BlogPosts from "../components/BlogPosts";

export default async function Index() {
  return (
    <div className="animate-in w-full flex flex-col items-center">
      <BlogPosts />
    </div>
  );
}
