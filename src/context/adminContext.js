"use client"
import { createContext } from "react";
import { useEffect, useState } from "react";
import { auth } from "@/database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AdminAuthentication from "@/components/adminAuthentication";

export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
    // Datas of Admin
    const [admin, setAdmin] = useState({
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        emailVerified: null,
        session: false,
    });
    // Get Admin Datas
    useEffect(() => {
        // Get Admin Datas
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAdmin({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    emailVerified: user.emailVerified,
                    session: true,
                });

            } else {
                setAdmin({
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
        <AdminContext.Provider value={{ admin }}>
            {admin.session ? children : <AdminAuthentication />}
        </AdminContext.Provider>
    );
}