import Link from "next/link";

export default function PostsTable() {
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

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-8 py-3 text-start"></th>

                                        <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                    Başlık
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-start">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                    Kategori
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-start">
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
                                    <tr>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="ps-6 py-3">
                                                <label htmlFor="hs-at-with-checkboxes-12" className="flex">
                                                    <input type="checkbox" className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="hs-at-with-checkboxes-12" />
                                                    <span className="sr-only">Checkbox</span>
                                                </label>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                <div className="flex items-center gap-x-3">
                                                    <div className="grow">
                                                        <span className="block text-sm font-semibold text-gray-800">{"Jessica Williams"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="h-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                                <span className="block text-sm text-gray-500">{"Marketing"}</span>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                                <span className="text-sm text-gray-500">{"18 Dec, 15:20"}</span>
                                            </div>
                                        </td>
                                        <td className="size-px whitespace-nowrap">
                                            <div className="px-6 py-1.5">
                                                <Link className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" href="#">
                                                    Düzenle
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold text-gray-800">{"12"}</span> gösterilenler
                                    </p>
                                </div>

                                <div>
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
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}