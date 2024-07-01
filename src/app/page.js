import Hero from "@/components/Hero";
import LatestPosts from "@/components/latestPosts";
import TopPosts from "@/components/topPosts";

export default function Home() {
  return (
    <main>
      <Hero />
      <TopPosts />
      <LatestPosts />
    </main>
  );
}
