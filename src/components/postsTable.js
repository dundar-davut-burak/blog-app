"use client";
import Link from "next/link";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "@/database/firebase";
import { useEffect, useState } from "react";
import { SuccesssNotification } from "./notifications";
import { ErrorNotification } from "./notifications";
import { useRouter } from "next/navigation";

export default function PostsTable() {

    const navigate = useRouter();

    const [docs, setDocs] = useState([]);
    const [isDataReady, setIsDataReady] = useState(false);

    const [showSuccessNatification, setShowSuccessNatification] = useState(false);
    const [showErrorNatification, setShowErrorNatification] = useState(false);

    const deleteArticle = (id) => {

        const docRef = doc(db, "posts", id);

        if (confirm("Silmek istediğinize emin misiniz?") == true) {
            deleteDoc(docRef).then(() => {
                setShowSuccessNatification(true);
                setTimeout(() => {
                    navigate.refresh();
                }, 1000);
            }).catch((error) => {
                setShowErrorNatification(true);
            });
        }
    }

    useEffect(() => {
        const querySnapshot = getDocs(collection(db, "posts"));
        querySnapshot.then((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setDocs(docs);
            setIsDataReady(true);
        });
    }, []);

    return (
        <div className="px-2 sm:px-4 lg:px-6 mx-auto">
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Gönderiler
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Gönderi oluştur, düzenle veya sil.
                                    </p>
                                </div>

                                <div>
                                    <div className="inline-flex gap-x-2">
                                        <Link className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="/admin/blog/yeni-gonderi">
                                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                            Yeni Gönderi
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full p-3 text-center bg-gray-50">
                                {showSuccessNatification && <SuccesssNotification message="Silme işlemi başarılı" />}
                                {showErrorNatification && <ErrorNotification message="Silme işlemi başarısız" />}
                            </div> <hr />

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-start"></th>

                                        <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                    Başlık
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3 text-start">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                    Kategori
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3 text-start">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                    Oluşturulma Tarihi
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-end"></th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {
                                        isDataReady &&
                                        docs.map((doc) => {
                                            return (
                                                <tr key={doc.id}>
                                                    <td className="size-px whitespace-nowrap"></td>
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <div className="grow">
                                                                    <span className="block text-sm font-semibold text-gray-800">{doc.title}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="block text-sm text-gray-500">{doc.category}</span>
                                                        </div>
                                                    </td>
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="text-sm text-gray-500">{doc.date}</span>
                                                        </div>
                                                    </td>
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="px-6 py-1.5 flex items-center gap-x-3">
                                                            <Link className="inline-flex items-center gap-x-1 text-sm text-white bg-yellow-500 p-1.5 rounded-md shadow-sm decoration-2 hover:bg-yellow-600 font-medium" href={`/admin/blog/${doc.id}`}>
                                                                Düzenle
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center gap-x-1 text-sm text-white bg-red-500 p-1.5 rounded-md shadow-sm decoration-2 hover:bg-red-600 font-medium"
                                                                onClick={() => { deleteArticle(doc.id) }}
                                                            >

                                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Gönderi Sayısı: <span className={`font-semibold ${docs.length == 0 ? "text-red-600 text-lg" : "text-green-600"}`}>{docs.length}</span>
                                    </p>
                                </div>

                                {/* <div>
                                    <div className="inline-flex gap-x-2">
                                        <button type="button" className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                            Önceki
                                        </button>

                                        <button type="button" className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                                            Sonraki
                                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </button>
                                    </div>
                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}