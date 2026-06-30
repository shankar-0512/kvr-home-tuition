import { getVideos } from "@/lib/videosData";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { Reveal } from "./Reveal";

export async function YouTubeTeaser() {
  const videos = await getVideos();
  const [featured, ...rest] = videos;
  const recent = rest.slice(0, 2);

  return (
    <section id="videos" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-orange-deep uppercase">On YouTube</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">Latest Videos</h2>
          </div>
          <a
            href="/videos"
            className="rounded-full border border-navy/30 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy/5"
          >
            View all videos →
          </a>
        </div>

        {featured ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <YouTubeEmbed youtubeId={featured.youtube_id} title={featured.title} />
              <div className="mt-3 text-sm font-semibold text-ink">{featured.title}</div>
            </Reveal>

            {recent.length > 0 && (
              <div className="flex flex-col gap-6 lg:col-span-2">
                {recent.map((v, i) => (
                  <Reveal key={v.id} delayMs={(i + 1) * 100}>
                    <YouTubeEmbed youtubeId={v.youtube_id} title={v.title} />
                    <div className="mt-3 text-sm font-semibold text-ink">{v.title}</div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="mt-8 text-muted">New videos are on the way - check back soon.</p>
        )}
      </div>
    </section>
  );
}
