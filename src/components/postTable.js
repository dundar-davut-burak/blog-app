"use client"
import { ErrorNotification, SuccesssNotification } from '@/components/notifications';
import { AppContext } from '@/context/appContext';
import { useContext } from 'react';
import Link from "next/link";

export default function PostTable({ value, setValue, showDraft, setShowDraft, createPostURL, isDataReady, records, td, deleteArticle, editPostURL, docsLength, currentPage, nextPage, prevPage }) {

    let { showSuccessNotification, showErrorNotification } = useContext(AppContext);

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                            {/* Title */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Gönderiler
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Gönderi oluştur, düzenle veya sil.
                                </p>
                            </div>

                            <div className="flex items-center gap-x-2">
                                {/* Search */}
                                <div className="flex items-center gap-x-2">
                                    <label htmlFor="search" className="sr-only">Gönderi Ara</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="search"
                                            name="search"
                                            value={value}
                                            onChange={(e) => {
                                                setValue(e.target.value);
                                            }}
                                            className="py-2 px-3 ps-11 block w-full outline-none border border-gray-200 rounded-lg text-sm focus:border-gray-400"
                                            placeholder="Başlığa veya kategoriye göre gönderi Ara"
                                            disabled={showDraft}
                                        />
                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                                            <svg
                                                className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="11" cy="11" r="8" />
                                                <path d="m21 21-4.3-4.3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {/* Buttons */}
                                <div className="inline-flex gap-x-2">
                                    {/* New Post Button */}
                                    <Link
                                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                                        href={createPostURL}
                                    >
                                        <svg
                                            className="flex-shrink-0 size-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="M12 5v14" />
                                        </svg>
                                        Yeni Gönderi
                                    </Link>
                                    {/* Show Draft Button */}
                                    <button
                                        type="button"
                                        className={`${showDraft ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                            } py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border`}
                                        onClick={() => {
                                            setShowDraft(!showDraft);
                                        }}
                                    >
                                        Taslaklar
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Notification */}
                        <div className="w-full p-3 text-center bg-gray-50">
                            {showSuccessNotification && <SuccesssNotification />}
                            {showErrorNotification && <ErrorNotification />}
                        </div>{" "}
                        <hr />
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {/* Empty Space */}
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                                    ></th>
                                    {/* Title */}
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                                    >
                                        <div className="flex items-center gap-x-2">
                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                Başlık
                                            </span>
                                        </div>
                                    </th>
                                    {/* Category */}
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                                    >
                                        <div className="flex items-center gap-x-2">
                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                Kategori
                                            </span>
                                        </div>
                                    </th>
                                    {/* Date */}
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                                    >
                                        <div className="flex items-center gap-x-2">
                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                Oluşturulma Tarihi
                                            </span>
                                        </div>
                                    </th>
                                    {/* Published Status */}
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                                    >
                                        <div className="flex items-center gap-x-2">
                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                Yayınlandı
                                            </span>
                                        </div>
                                    </th>
                                    {/* Edit and Delete Buttons */}
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                                    ></th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {isDataReady && records.length > 0 &&
                                    td(showDraft).map((doc) => {
                                        return (
                                            <tr key={doc.id}>
                                                {/* Empty Space */}
                                                <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"></td>
                                                {/* Title */}
                                                <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                    <span className="block text-sm font-semibold text-gray-800">
                                                        {doc.title}
                                                    </span>
                                                </td>
                                                {/* Category */}
                                                <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                    <span className="block text-sm text-gray-500">
                                                        {doc.category}
                                                    </span>
                                                </td>
                                                {/* Date */}
                                                <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                    <span className="text-sm text-gray-500">
                                                        {doc.date}
                                                    </span>
                                                </td>
                                                {/* Published Status */}
                                                <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                    <span className="text-sm text-gray-500">
                                                        {doc.published ? "Evet" : "Hayır"}
                                                    </span>
                                                </td>
                                                {/* Edit and Delete Buttons */}
                                                <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                    <div className="flex items-center gap-x-3">
                                                        {/* Edit Button */}
                                                        <Link
                                                            className="inline-flex items-center gap-x-1 text-sm text-white bg-yellow-500 p-1.5 rounded-md shadow-sm decoration-2 hover:bg-yellow-600 font-medium"
                                                            href={`${editPostURL}/${doc.id}`}
                                                        >
                                                            Düzenle
                                                        </Link>
                                                        {/* Delete Button */}
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center gap-x-1 text-sm text-white bg-red-500 p-1.5 rounded-md shadow-sm decoration-2 hover:bg-red-600 font-medium"
                                                            onClick={() => {
                                                                deleteArticle(doc.id);
                                                            }}
                                                        >
                                                            Sil
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                            {/* Show Total Posts */}
                            <div>
                                <p className="text-sm text-gray-600">
                                    Gönderi Sayısı:{" "}
                                    <span
                                        className={`font-semibold ${docsLength == 0
                                            ? "text-red-600 text-lg"
                                            : "text-green-600"
                                            }`}
                                    >
                                        {docsLength}
                                    </span>
                                </p>
                            </div>
                            {/* Pagination Buttons */}
                            <div className="flex items-center gap-x-2">
                                <span className="text-sm text-gray-600">Şuan {currentPage}. sayfadasınız</span>
                                <button
                                    type="button"
                                    className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                                    disabled={currentPage === 1}
                                    onClick={() => prevPage()}
                                >
                                    <svg
                                        className="flex-shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m15 18-6-6 6-6" />
                                    </svg>
                                    Önceki
                                </button>
                                <button
                                    type="button"
                                    className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                                    onClick={() => nextPage()}
                                >
                                    Sonraki
                                    <svg className="flex-shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}