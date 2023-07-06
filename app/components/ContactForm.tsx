"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [view, setView] = useState("send");

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("messages")
      .insert({ email, content });

    setView("thank-you");
  };

  return (
    <div>
      {view === "thank-you" ? (
        <div>
          <div className="text-xl">Thank you for reaching out!</div>
          <div className="pt-3 w-96">
            Your message has been recieved, I will reply as soon as possible.
          </div>
          <div className="pt-3">Your message was:</div>
          <pre className="pt-2 text-gray-600">{content}</pre>
          <div className="pt-4 text-gray-600 text-xs justify-self-end">
            {email}
          </div>
        </div>
      ) : (
        <form>
          <div className="mb-6 w-96">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              id="email"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="name@yourmail.com"
              required
            ></input>
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              id="message"
              name="message"
              rows={5}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>

          <button
            onClick={handleSendMessage}
            className=" text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
