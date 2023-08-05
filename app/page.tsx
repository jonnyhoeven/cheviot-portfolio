import AvaHero from "@/components/AvaHero";
import VideoEmbedHero from "@/components/VideoEmbedHero";

export default async function Index() {
  return (
    <div className="w-full">
      <AvaHero />

      <VideoEmbedHero />
    </div>
  );
}
