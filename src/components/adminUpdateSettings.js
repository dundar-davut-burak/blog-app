"use client"
import { useRef, useState } from "react";
import { auth } from "@/database/firebase";
import { ErrorNotification, SuccesssNotification } from "./notifications";
import { sendEmailVerification, updateEmail, updatePassword } from "firebase/auth";

export default function UpdateSettings() {

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("Bir hata oluştu. Lütfen tekrar deneyin.");

    const form1 = useRef();
    const form2 = useRef();
    const form3 = useRef();

    const changeEmail = async (e) => {
        e.preventDefault();
        const email = form1.current.email.value;

        try {
            await updateEmail(auth.currentUser, email).then(() => {
                setShowSuccess(true);
                setMessage("E-posta adresiniz güncellendi.");
            }).catch((error) => {
                setShowError(true);
                setMessage("E-posta adresiniz güncellenemedi.");
            });
        } catch (error) {
            setShowError(true);
            setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
        }

    }

    const changePassword = async (e) => {
        e.preventDefault();
        const password = form2.current.password.value;
        const repassword = form2.current.repassword.value;

        if (password !== repassword) {
            setShowError(true);
            setMessage("Parolalar uyuşmuyor.");
            return;
        }

        try {
            await updatePassword(auth.currentUser, password).then(() => {
                setShowSuccess(true);
                setMessage("Parolanız güncellendi.");
            }).catch((error) => {
                setShowError(true);
                setMessage("Parolanız güncellenemedi.");
            });
        } catch (error) {
            setShowError(true);
            setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    }

    const sendVerificationEmail = async (e) => {
        e.preventDefault();
        const emailVerified = form3.current.emailVerified.value;

        try {
            await sendEmailVerification(auth.currentUser, emailVerified).then(() => {
                setShowSuccess(true);
                setMessage("E-posta doğrulanma linki gönderildi.");
            }).catch((error) => {
                setShowError(true);
                setMessage("E-posta doğrulanma linki gönderilemedi.");
            });
        } catch (error) {
            setShowError(true);
            setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    }

    return (
        <div className="px-2 sm:px-4 lg:px-6 mx-auto">
            <div className="my-4 p-4 bg-gray-50">
                {showSuccess && <SuccesssNotification message={message} />}
                {showError && <ErrorNotification message={message} />}
            </div>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10">
                    <h2 className="text-base font-semibold leading-7 text-indigo-500">Ayarlar</h2>

                    <div className="mt-10 grid grid-cols-1 gap-y-8">
                        <form className="sm:col-span-4" method="POST" ref={form1} onSubmit={changeEmail}>
                            <label htmlFor="email" className="block text-sm font-medium leading-6">E-posta</label>

                            <div className="mt-2 border border-1 border-gray-300 rounded-md">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full block py-1.5 pl-1 outline-none"
                                    defaultValue={auth.currentUser.email}
                                    placeholder="E-posta adresin"
                                    title="E-posta adresin"
                                    required
                                />
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600"
                                >
                                    Güncelle
                                </button>
                            </div>
                        </form>

                        <form className="col-span-full" method="POST" ref={form2} onSubmit={changePassword}>
                            <label htmlFor="password" className="block text-sm font-medium leading-6">Parola</label>
                            <div className="mt-2 flex items-center p-2 border border-1 border-gray-300 rounded-md">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full block py-1.5 outline-none"
                                    placeholder="Parola"
                                    title="Parola"
                                    required
                                />
                                <input
                                    type="password"
                                    id="repassword"
                                    name="repassword"
                                    className="w-full block py-1.5 outline-none"
                                    placeholder="Parolanızı tekrar girin"
                                    title="Parola tekrar"
                                    required
                                />
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600"
                                >
                                    Güncelle
                                </button>
                            </div>
                        </form>

                        <form className="col-span-full" method="POST" ref={form3} onSubmit={sendVerificationEmail}>
                            <label htmlFor="emailVerified" className="block text-sm font-medium leading-6">E-posta Doğrulama</label>
                            <div className="mt-2 flex items-center p-2 border border-1 border-gray-300 rounded-md">
                                <div>
                                    <span>E-posta adresim doğrulanmış mı?</span>
                                    {auth.currentUser.emailVerified ? (
                                        <span className="text-green-500">Evet</span>
                                    ) : (
                                        <span className="text-red-500">Hayır</span>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        id="emailVerified"
                                        name="emailVerified"
                                        className="w-full block py-1.5 outline-none"
                                        placeholder="E-posta doğrulanma linki gönder"
                                        title="E-posta doğrulanma linki gönder"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
                                >
                                    Gönder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}