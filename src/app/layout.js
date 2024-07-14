"use client"
import "./globals.css";
import { Inter } from "next/font/google";
import { AppContext } from "@/context/appContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { db, storage } from "@/database/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [siteLogo, setSiteLogo] = useState("");
  const [siteFavicon, setSiteFavicon] = useState("");

  useEffect(() => {
    const docRef = doc(db, "siteSettings", "settings");
    const docSnap = getDoc(docRef);

    docSnap.then((doc) => {
      if (doc.exists()) {
        setSiteTitle(doc.data().siteTitle);
        setSiteDescription(doc.data().siteDescription);
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

    getDownloadURL(ref(storage, 'images/logo.png')).then((url) => {
      setSiteLogo(url);
    }).catch((error) => {
      console.log(error);
    });

    getDownloadURL(ref(storage, 'images/logo.ico')).then((url) => {
      setSiteFavicon(url);
    }).catch((error) => {
      console.log(error);
    });

  }, []);

  return (
    <html lang="tr">
      <body className={inter.className}>
        <AppContext.Provider value={{ siteTitle, siteDescription, siteLogo, siteFavicon }}>
          <Header />
          {children}
          <Footer />
        </AppContext.Provider>
      </body>
    </html>
  );
}