"use client"
import { useEffect, useState } from "react";
import AdminNavbar from "@/components/adminNavbar";
import { AdminContext } from "@/context/adminContext";
import AdminAuthentication from "@/components/adminAuthentication";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/database/firebase";

export default function AdminLayout({ children }) {

    const [admin, setAdmin] = useState({
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        emailVerified: null,
        session: false
    });

    const value = {
        admin, setAdmin
    }

    useEffect(() => {
        // Update the document title using the browser API
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAdmin({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    emailVerified: user.emailVerified,
                    session: true
                })
            } else {
                setAdmin({
                    uid: null,
                    email: null,
                    displayName: null,
                    photoURL: null,
                    emailVerified: null,
                    session: false
                })
            }
        })
    });

    return (
        <AdminContext.Provider value={value}>
            {admin.session ?
                <div className="flex flex-1">
                    <AdminNavbar />
                    <main className="p-4 w-full">
                        {children}
                    </main>
                </div> :
                <AdminAuthentication />
            }
        </AdminContext.Provider>
    )
}