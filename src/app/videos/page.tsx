import type { Metadata } from "next";
import { getVideos } from "@/lib/videosData";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export const metadata: Metadata = {
  title: "Videos | KVR Brain Point - Home Tuition Chennai & Online Coaching",
  description:
    "Watch lessons and tips from KVR Brain Point on YouTube - home tuition in Chennai and online coaching across Tamil Nadu & India for Classes 1–12.",
  keywords: [
    "KVR Brain Point YouTube",
    "home tuition Chennai videos",
    "online tuition India lessons",
    "CBSE ICSE State Board video lessons",
  ],
  alternates: {
    canonical: "/videos",
  },
  openGraph: {
    title: "Videos | KVR Brain Point",
    description:
      "Watch lessons and tips from KVR Brain Point on YouTube - home tuition in Chennai and online coaching across Tamil Nadu & India.",
    url: "/videos",
    siteName: "KVR Brain Point",
    type: "website",
  },
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />

      <main>
        <section className="clip-diagonal-down relative bg-gradient-to-br from-navy-deep via-navy to-orange pb-28 pt-16 md:pt-20">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-xs font-semibold tracking-wide text-orange uppercase">YouTube Channel</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
              Videos from KVR Brain Point
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Lessons, tips, and updates - straight from the channel.
            </p>
            <a
              href="https://www.youtube.com/@Kvr_brain_point"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-navy transition hover:bg-orange hover:text-ink"
            >
              Subscribe on YouTube
            </a>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4">
            {videos.length ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((v) => (
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
              <p className="text-muted">No videos yet - check back soon.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
    </div>
  );
}
