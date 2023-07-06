import React from "react";

export default function VideoEmbed({ src = "", title = "" }) {
  return (
    <div>
      <div className="text-2xl pt-10 pb-3">{title}</div>
      <iframe
        className="rounded-xl shadow-xl w-full aspect-video"
        src={src}
        title={title}
      />
    </div>
  );
}
