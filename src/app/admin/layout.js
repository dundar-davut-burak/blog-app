"use client"
import { useState } from "react";
import AdminNavbar from "@/components/adminNavbar";
import { AdminContext } from "@/context/adminContext";
import Authentication from "@/components/authentication";

export default function AdminLayout({ children }) {

    const [admin, setAdmin] = useState(false);

    const value = {
        admin, setAdmin
    }

    return (
        <AdminContext.Provider value={value}>
            {admin ?
                <div className="flex flex-1">
                    <AdminNavbar />
                    <main className="p-4">
                        {children}
                    </main>
                </div> :
                <Authentication />
            }
        </AdminContext.Provider>
    )
}