"use client"
import { createContext } from "react";
import { useEffect, useState } from "react";
import { auth, db, storage } from "@/database/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    // User State
    const [user, setUser] = useState({
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        emailVerified: null,
        session: false,
    });
    // Site Settings
    const [siteTitle, setSiteTitle] = useState("");
    const [siteDescription, setSiteDescription] = useState("");
    const [siteKeywords, setSiteKeywords] = useState("");
    const [siteUrls, setSiteUrls] = useState({});
    const [siteLogo, setSiteLogo] = useState("");
    const [siteFavicon, setSiteFavicon] = useState("");
    const [notificationMessage, setMessageNotification] = useState("");
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [showWarningNotification, setShowWarningNotification] = useState(false);

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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    emailVerified: user.emailVerified,
                    session: true,
                });
            } else {
                setUser({
                    uid: null,
                    email: null,
                    displayName: null,
                    photoURL: null,
                    emailVerified: null,
                    session: false,
                });
            }
        });
    }, []);

    return (
        <AppContext.Provider value={{
            siteTitle,
            siteDescription,
            siteKeywords,
            siteUrls, siteLogo,
            siteFavicon,
            notificationMessage,
            setMessageNotification,
            showSuccessNotification,
            setShowSuccessNotification,
            showErrorNotification,
            setShowErrorNotification,
            showWarningNotification,
            setShowWarningNotification,
            user,
            setUser
        }}>
            {children}
        </AppContext.Provider>
    );
}