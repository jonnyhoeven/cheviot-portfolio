import AvaHero from "@/components/AvaHero";
import VideoEmbedHero from "@/components/VideoEmbedHero";
import HistoricTimeline from "@/components/HistoricTimeline";

export default async function Index() {
  return (
    <div className="w-full flex flex-col items-center">
      <AvaHero />

      <HistoricTimeline />

      <VideoEmbedHero />
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </div>
  );
}
