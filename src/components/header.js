"use client"
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "@/context/appContext";

export default function Header() {

  let { siteTitle, siteLogo } = useContext(AppContext);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Image alt={"Logo"} src={siteLogo ? siteLogo : "/logo.png"} width={64} height={64} />
          <span className="ml-3 text-xl">{siteTitle}</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/"} className="mr-5 hover:text-gray-900">
            Ana Sayfa
          </Link>
          <Link href={"/blog"} className="mr-5 hover:text-gray-900">
            Blog
          </Link>
          <Link href={"/hakkimda"} className="mr-5 hover:text-gray-900">
            Hakkımda
          </Link>
        </nav>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Kayıt ol
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
