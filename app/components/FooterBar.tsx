import Link from "next/link";

export default async function FooterBar() {
  return (
    <footer className="bg-gray-100 rounded-lg shadow dark:bg-gray-900 mx-8 mt-20 mb-8">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0">
            <span className="text-2xl mr-2">🍒</span>
            <span className="self-center text-md font-semibold whitespace-nowrap dark:text-white">
              Justme.dev
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/tos" className="mr-4 hover:underline md:mr-6 ">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Justme.dev
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
