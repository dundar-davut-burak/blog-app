"use client"
import { createContext } from "react";
import { useEffect, useState } from "react";
import { db, storage } from "@/database/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    // Site Settings
    const [siteTitle, setSiteTitle] = useState("");
    const [siteDescription, setSiteDescription] = useState("");
    const [siteKeywords, setSiteKeywords] = useState("");
    const [siteUrls, setSiteUrls] = useState({});
    const [siteLogo, setSiteLogo] = useState("");
    const [siteFavicon, setSiteFavicon] = useState("");

    // Get Site Settings
    useEffect(() => {
        // Get Site Settings from Firestore
        const docRef = doc(db, "siteSettings", "settings");
        const docSnap = getDoc(docRef);
        // Set Site Settings to States
        docSnap.then((doc) => {
            if (doc.exists()) {
                setSiteTitle(doc.data().siteTitle);
                setSiteDescription(doc.data().siteDescription);
                setSiteKeywords(doc.data().siteKeywords);
                setSiteUrls({
                    siteInstagramUrl: doc.data().siteInstagramUrl,
                    siteTwitterUrl: doc.data().siteTwitterUrl,
                    siteLinkedinUrl: doc.data().siteLinkedinUrl
                });
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        // Get Site Logo and Favicon
        getDownloadURL(ref(storage, 'site-images/logo.png')).then((url) => {
            setSiteLogo(url);
        }).catch((error) => {
            console.log(error);
        });
        getDownloadURL(ref(storage, 'site-images/favicon.ico')).then((url) => {
            setSiteFavicon(url);
        }).catch((error) => {
            console.log(error);
        });

    }, []);

    return (
        <AppContext.Provider value={{ siteTitle, siteDescription, siteKeywords, siteUrls, siteLogo, siteFavicon }}>
            {children}
        </AppContext.Provider>
    );
}