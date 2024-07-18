"use client";
import { AdminContext } from "@/context/adminContext";
import { auth } from "@/database/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useContext, useState } from "react";
import { ErrorNotification } from "./notifications";

export default function AdminNavbar() {
  // Admin Context
  let { setAdmin } = useContext(AdminContext);
  // Notification State
  const [showNotification, setShowNotification] = useState(false);

  // SignOut
  const signOutF = () => {
    signOut(auth)
      .then(() => {
        setAdmin({
          uid: null,
          email: null,
          displayName: null,
          photoURL: null,
          emailVerified: null,
          session: false,
        });
      })
      .catch((error) => {
        // An error happened.
        setShowNotification(true);
        console.log(error);
      });
  };

  return (
    <nav className="flex flex-col flex-2 p-4">
      {/* Admin navbar Brand */}
      <div className="space-y-4 mb-5">
        <h5 className="px-3 py-4 text-lg font-bold text-gray-900">Menü</h5>
      </div>
      {/* Admin Navbar */}
      <div className="space-y-4">
        <div className="group">
          <Link
            href="/admin"
            title=""
            className="flex items-center group p-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:text-white hover:bg-indigo-600"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Gösterge Paneli
          </Link>
        </div>

        <hr className="border-gray-200" />

        <div className="group">
          <Link
            href="/admin/blog"
            className="flex items-center group p-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:text-white hover:bg-indigo-600"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            Blog
          </Link>
        </div>

        <hr className="border-gray-200" />

        <div className="group">
          <Link
            href="/admin/profilim"
            className="flex items-center group p-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:text-white hover:bg-indigo-600"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profilim
          </Link>
          <Link
            href="/admin/ayarlar"
            className="flex items-center group p-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:text-white hover:bg-indigo-600"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Ayarlar
          </Link>
        </div>
      </div>
      {/* Error Notification for SignOut */}
      {showNotification ? (
        <ErrorNotification message={"Çıkış yapılamadı"} />
      ) : (
        <></>
      )}
      <hr className="border-gray-200" />
      {/* SignOut Button */}
      <div className="pt-4">
        <button
          onClick={signOutF}
          type="button"
          className="items-center w-full group p-3 border-2 border-red-500 text-sm font-medium text-red-500 transition-all duration-200 rounded-lg hover:bg-red-500 hover:text-white"
        >
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
}
