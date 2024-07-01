import AdminNavbar from "@/components/adminNavbar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex flex-1">
            <AdminNavbar />
            <main className="p-4">
                {children}
            </main>
        </div>
    )
}