"use client"
import { createContext } from "react";
import { useEffect, useState } from "react";
import { db, storage } from "@/database/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [siteTitle, setSiteTitle] = useState("");
    const [siteDescription, setSiteDescription] = useState("");
    const [siteKeywords, setSiteKeywords] = useState("");
    const [siteLogo, setSiteLogo] = useState("");
    const [siteFavicon, setSiteFavicon] = useState("");

    useEffect(() => {
        const docRef = doc(db, "siteSettings", "settings");
        const docSnap = getDoc(docRef);

        docSnap.then((doc) => {
            if (doc.exists()) {
                setSiteTitle(doc.data().siteTitle);
                setSiteDescription(doc.data().siteDescription);
                setSiteKeywords(doc.data().siteKeywords);
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
        <AppContext.Provider value={{ siteTitle, siteDescription, siteKeywords, siteLogo, siteFavicon }}>
            {children}
        </AppContext.Provider>
    );
}