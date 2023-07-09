'use client'

import { useState } from 'react'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return new Error("Missing email or password");
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SERVER}/auth/callback`,
      },
    });
    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/");
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    console.log("RGOOGLE", {
      redirectTo: `${process.env.NEXT_PUBLIC_SERVER}/auth/callback`,
    });
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${process.env.NEXT_PUBLIC_SERVER}/auth/callback`,
      },
    });
  };

  const handleGitHubSignIn = async () => {
    console.log("RGITHUB", {
      redirectTo: `${process.env.NEXT_PUBLIC_SERVER}/auth/callback`,
    });
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SERVER}/auth/callback`,
      },
    });
  };

  return (
    <div className="animate-in flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      {view === "check-email" ? (
        <p className="text-center text-foreground">
          Check <span className="font-bold">{email}</span> to continue signing
          up
        </p>
      ) : (
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />
          {view === "sign-in" && (
            <>
              <button className="bg-gray-700 rounded px-4 py-2 text-white mb-6">
                Sign In
              </button>
              <button
                onClick={handleGoogleSignIn}
                className="flex  bg-gray-700 rounded px-4 py-2 text-white mb-6"
              >
                <div className="mr-20">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
                    ></path>
                    <path
                      fill="#EA4335"
                      d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
                    ></path>
                    <path fill="none" d="M2 2h44v44H2z"></path>
                  </svg>
                </div>
                <div className="self-start">Sign In with Google</div>
              </button>
              <button
                onClick={handleGitHubSignIn}
                className="bg-gray-700 rounded px-4 py-2 text-white mb-6"
              >
                Sign In with GitHub
              </button>
              <p className="text-sm text-center">
                Don't have an account?
                <button
                  className="ml-1 underline"
                  onClick={() => setView("sign-up")}
                >
                  Sign Up Now
                </button>
              </p>
            </>
          )}
          {view === "sign-up" && (
            <>
              <button className="bg-gray-700 rounded px-4 py-2 text-white mb-6">
                Sign Up
              </button>
              <p className="text-sm text-center">
                Already have an account?
                <button
                  className="ml-1 underline"
                  onClick={() => setView("sign-in")}
                >
                  Sign In Now
                </button>
              </p>
            </>
          )}
        </form>
      )}
    </div>
  );
}
