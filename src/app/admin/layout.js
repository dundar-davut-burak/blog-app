"use client"
import AdminContextProvider from "@/context/adminContext";
import Navbar from "@/components/admin_components/navbar";
import NextBreadcrumb from "@/components/breadcrumb";

export default function AdminLayout({ children }) {
  return (
    <AdminContextProvider>
      <div className={`${window.screen.width < 481 ? "block" : "flex flex-1"}`}>
        <Navbar />
        <div className="p-4 w-full">
          <section>
            <NextBreadcrumb
              separator={<span className="text-gray-500"> {">"} </span>}
              activeClasses="text-indigo-500"
              containerClasses="flex p-4 mb-2 items-center"
              listClasses="text-gray-500 mx-2"
              capitalizeLinks
            />
          </section>
          <main>
            {children}
          </main>
        </div>
      </div>
    </AdminContextProvider>
  );
}
