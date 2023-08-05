import React from "react";

export default function VideoEmbed({ src = "", title = "" }) {
  return (
    <div>
      <iframe
        className="rounded-xl shadow-xl w-full aspect-video"
        src={src}
        title={title}
      />
    </div>
  );
}
