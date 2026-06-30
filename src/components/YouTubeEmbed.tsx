"use client";

import { useState } from "react";
import Image from "next/image";

export function YouTubeEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-ink-deep">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-ink-deep"
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-ink/20 transition group-hover:bg-ink/30">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange shadow-lg transition group-hover:brightness-105">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6 text-ink" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
