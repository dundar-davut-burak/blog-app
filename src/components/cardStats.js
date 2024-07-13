export default function CardStatistics() {
    return (
        <div className="max-w-[85rem] p-4 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                    <div className="p-4 md:p-5 flex gap-x-4">
                        <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                            <svg
                                className="flex-shrink-0 size-5 text-gray-600"
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
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <div className="grow">
                            <div className="flex items-center gap-x-2">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Total users
                                </p>
                            </div>
                            <div className="mt-1 flex items-center gap-x-2">
                                <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                                    72,540
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                    <div className="p-4 md:p-5 flex gap-x-4">
                        <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                            <svg
                                className="flex-shrink-0 size-5 text-gray-600"
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
                                <path d="M5 22h14" />
                                <path d="M5 2h14" />
                                <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                                <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                            </svg>
                        </div>

                        <div className="grow">
                            <div className="flex items-center gap-x-2">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Sessions
                                </p>
                            </div>
                            <div className="mt-1 flex items-center gap-x-2">
                                <h3 className="text-xl font-medium text-gray-800">
                                    29.4%
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                    <div className="p-4 md:p-5 flex gap-x-4">
                        <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                            <svg className="flex-shrink-0 size-5 text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
                                <path d="m12 12 4 10 1.7-4.3L22 16Z" />
                            </svg>
                        </div>

                        <div className="grow">
                            <div className="flex items-center gap-x-2">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Avg. Click Rate
                                </p>
                            </div>
                            <div className="mt-1 flex items-center gap-x-2">
                                <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                                    56.8%
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                    <div className="p-4 md:p-5 flex gap-x-4">
                        <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                            <svg
                                className="flex-shrink-0 size-5 text-gray-600"
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
                                <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
                                <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
                                <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
                            </svg>
                        </div>

                        <div className="grow">
                            <div className="flex items-center gap-x-2">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Pageviews
                                </p>
                            </div>
                            <div className="mt-1 flex items-center gap-x-2">
                                <h3 className="text-xl font-medium text-gray-800">
                                    92,913
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}