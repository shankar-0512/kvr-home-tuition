"use client";

import { useMemo, useState } from "react";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { STANDARDS } from "@/lib/standards";
import type { Video } from "@/lib/videosData";

export function VideoGallery({ videos }: { videos: Video[] }) {
  const [filter, setFilter] = useState<string>("All");

  const availableStandards = useMemo(
    () => STANDARDS.filter((s) => videos.some((v) => v.standards?.includes(s))),
    [videos]
  );

  const filtered = filter === "All" ? videos : videos.filter((v) => v.standards?.includes(filter));

  if (!videos.length) {
    return <p className="text-muted">No videos yet - check back soon.</p>;
  }

  return (
    <div>
      {availableStandards.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <FilterChip label="All" active={filter === "All"} onClick={() => setFilter("All")} />
          {availableStandards.map((s) => (
            <FilterChip key={s} label={s} active={filter === s} onClick={() => setFilter(s)} />
          ))}
        </div>
      )}

      {filtered.length ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <div key={v.id}>
              <YouTubeEmbed youtubeId={v.youtube_id} title={v.title} />
              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="text-sm font-semibold text-ink">{v.title}</div>
                {v.featured && (
                  <span className="shrink-0 rounded-full bg-orange px-2.5 py-0.5 text-[10px] font-bold text-ink uppercase">
                    Featured
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No videos for {filter} standard yet.</p>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-navy text-white"
          : "border border-navy/30 text-navy hover:bg-navy/5"
      }`}
    >
      {label}
    </button>
  );
}
