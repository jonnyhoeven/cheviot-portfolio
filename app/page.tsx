import AvaHero from "@/components/AvaHero";
import VideoEmbedHero from "@/components/VideoEmbedHero";
import HistoricTimeline from "@/components/HistoricTimeline";

export default async function Index() {
  return (
    <div className="w-full">
      <AvaHero />

      <HistoricTimeline />

      <VideoEmbedHero />
    </div>
  );
}
