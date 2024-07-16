"use client"
import Hero from "@/components/Hero";
import HeadTag from "@/components/head";
import LatestPosts from "@/components/latestPosts";
import TopPosts from "@/components/topPosts";
import { AppContext } from "@/context/appContext";
import { useContext } from "react";

export default function Home() {

  let { siteTitle, siteDescription, siteKeywords, siteFavicon } = useContext(AppContext)

  return (
    <>
      <HeadTag
        title={siteTitle}
        description={siteDescription}
        keywords={siteKeywords}
        icon={siteFavicon}
      />
      <main>
        <Hero />
        <TopPosts />
        <LatestPosts />
      </main>
    </>
  );
}
