"use client"
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { AppContext } from "@/context/appContext";
import { signOut } from "firebase/auth";
import { auth } from "@/database/firebase";
import { useRouter } from "next/navigation";

export default function Header() {
  // Get Site Settings
  let { siteTitle, siteLogo, user } = useContext(AppContext);
  // Router
  const navigate = useRouter();
  // Dropdown
  const [showDropdown, setShowDropdown] = useState(false);
  // Toggle Dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="text-gray-600 body-font">
      {/* Navbar */}
      <div className={`container mx-auto p-5 flex flex-wrap ${screen.width > 481 ? "flex-row" : "flex-col gap-y-4"}  justify-between items-center`}>
        {/* Logo and Title */}
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-gray-900 my-2"
        >
          <Image alt={"Logo"} src={siteLogo ? siteLogo : "/logo.png"} width={64} height={64} />
          <span className="ml-3 text-xl">{siteTitle}</span>
        </Link>
        {/* Navbar */}
        <nav className="flex flex-wrap items-center text-base justify-center my-2">
          <Link href={"/"} className="p-2 hover:text-gray-900">
            Ana Sayfa
          </Link>
          <Link href={"/blog"} className="p-2 hover:text-gray-900">
            Blog
          </Link>
          <Link href={"/hakkimda"} className="p-2 hover:text-gray-900">
            Hakkımda
          </Link>
        </nav>
        {/* Login Button */}
        {user.session ? (
          <div>
            <div
              className={`${showDropdown ? "block" : "hidden"} p-1 bg-white divide-x divide-gray-100 rounded-lg shadow flex items-center text-center ${screen.width > 481 ? "absolute top-24 right-10 z-10" : ""}`}
              onClick={toggleDropdown}
            >
              <div className="px-4 py-2 text-center hover:bg-gray-100">
                <Link href={"/profilim"}>Profilim</Link>
              </div>
              <div className="px-4 py-2 text-center hover:bg-gray-100">
                <Link href={"/ayarlar"}>Ayarlar</Link>
              </div>
              <div className="px-4 py-2 text-center hover:bg-gray-100">
                <Link href={"/gonderi-olustur"}>Gönderi Oluştur</Link>
              </div>
              <div className="px-4 py-2">
                <button
                  type="button"
                  className="p-2 bg-red-500 text-white border-0 focus:outline-none hover:bg-red-600 rounded text-base"
                  onClick={() => signOut(auth)}
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleDropdown}
              className="w-full"
            >
              <Image
                alt="Profile"
                src={user.photoURL ? user.photoURL : "https://dummyimage.com/64x64"}
                className="object-cover object-center rounded-full mx-auto my-2"
                width={64}
                height={64}
                priority
              />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={() => navigate.push("/giris-yap")}
          >
            Giriş Yap
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
        )}
      </div>
    </header >
  );
}
