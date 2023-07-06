import Image from "next/image";

export default function AvaHero() {
  return (
    <div className="w-full animate-in flex items-center justify-center h-screen dark:text-white">
      <Image
        className="shadow-xl border-4 border-gray-900 dark:border-gray-100 rounded-full w-32 md:w-64"
        alt="Jonny van der Hoeven"
        src="/jonny.jpg"
        width={128}
        height={128}
      />
      <div className="text-2xl md:text-4xl font-bold pl-10">
        <div className="font-inter">Justme.dev</div>
        <a
          href="mailto:jonny@justme.dev"
          className="text-xs hover:text-gray-900 dark:hover:text-gray-300"
        >
          jonny@justme.dev
        </a>
      </div>
    </div>
  );
}
