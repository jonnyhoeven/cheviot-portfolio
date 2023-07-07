import Link from "next/link";

export default async function FooterBar() {
  return (
    <footer className="mt-20">
      <div className="w-full max-w-screen-xl mx-auto pb-4">
        <div className="sm:flex sm:items-center sm:justify-between px-12">
          <Link href="/" className="flex items-center mb-4 sm:mb-0">
            <span className="text-2xl mr-2">🍒</span>
            <span className="self-center text-md font-semibold whitespace-nowrap dark:text-white hover:underline">
              Justme.dev
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/tos" className="mr-4 hover:underline md:mr-6 ">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="block text-sm text-gray-500 text-center dark:text-gray-400">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            Justme.dev
          </Link>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
