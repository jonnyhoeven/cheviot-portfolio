import React from "react";
import VideoEmbed from "./VideoEmbed";

export default function VideoEmbedHero() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-1 gap-10 justify-center px-10 pb-10 bg-gray-500 text-white dark:bg-gray-700">
      <VideoEmbed
        src="https://www.youtube-nocookie.com/embed/videoseries?list=PLFJTjjyvdWZw3sQ3i1lZih1pcmtLKM92i"
        title="Cool tech and frameworks"
      />
    </div>
  );
}
