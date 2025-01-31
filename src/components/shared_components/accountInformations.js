"use client"
import { AppContext } from '@/context/appContext';
import { useContext } from 'react';
import { ErrorNotification, SuccesssNotification } from "@/components/notifications";
import { auth } from "@/database/firebase";

export default function AccountInformations({ refForm, changeEmail, sendChangePasswordEmail, sendEmail }) {
    
    let { showSuccessNotification, showErrorNotification } = useContext(AppContext);
    
    return (
        <div className="px-2 sm:px-4 lg:px-6 mx-auto border-b border-gray-900/10">
            {/* Notifications */}
            <div className="my-4 p-3">
            {showSuccessNotification && <SuccesssNotification />}
            {showErrorNotification && <ErrorNotification />}
            </div>
            <div className="space-y-12">
                <div>
                    {/* Profile Information */}
                    <h2 className="text-base font-semibold leading-7 text-indigo-500">
                        Ayarlar
                    </h2>

                    <div className="my-4 grid grid-cols-1 gap-y-8">
                        {/* Change Email */}
                        <form
                            className="col-span-full"
                            method="POST"
                            ref={refForm}
                            onSubmit={changeEmail}
                        >
                            <label
                                htmlFor="email"
                                className="block text-md font-medium leading-6"
                            >
                                E-posta Güncelleme
                            </label>

                            <div className="my-2 flex items-center">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full block py-1.5 pl-1 outline-none border border-1 border-gray-300 rounded-md"
                                    defaultValue={auth.currentUser.email}
                                    placeholder="E-posta adresin"
                                    title="E-posta adresin"
                                    required
                                />

                                <button
                                    type="submit"
                                    className="rounded-md bg-yellow-500 px-3 py-2 mx-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600"
                                >
                                    Güncelle
                                </button>
                            </div>
                        </form>
                        {/* Change Password */}
                        <div
                            className={`my-2 ${screen.width < 481 ? "block" : "flex items-center"
                                }`}
                        >
                            <form
                                className="w-full"
                                method="POST"
                                onSubmit={sendChangePasswordEmail}
                            >
                                <span className="block text-md font-medium leading-6">
                                    Parola Sıfırlama
                                </span>
                                <div className="my-4">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
                                    >
                                        Parola Sıfırlama Linki Gönder
                                    </button>
                                </div>
                            </form>
                            {/* Email Verification */}
                            <form className="w-full" method="POST" onSubmit={sendEmail}>
                                <span className="block text-md font-medium leading-6">
                                    E-posta Doğrulama
                                </span>

                                <div className="my-4">
                                    <button
                                        type="submit"
                                        className={`rounded-md shadow-sm px-3 py-2 text-sm font-semibold text-white ${auth.currentUser.emailVerified
                                            ? "bg-green-500"
                                            : "bg-indigo-500"
                                            }`}
                                        disabled={auth.currentUser.emailVerified ? true : false}
                                    >
                                        {auth.currentUser.emailVerified ? (
                                            <span>Doğrulanmış</span>
                                        ) : (
                                            <span>Doğrulama Linki Gönder</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}