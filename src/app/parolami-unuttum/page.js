"use client";
import { useRef, useState } from "react";
import { auth } from "@/database/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { SuccesssNotification } from "@/components/notifications";

export default function ForgotPasswordPage() {

    const previousePage = () => {
        window.history.back();
    }

    const form = useRef();
    const email_error = document.getElementById("email-error");
    const [showNotification, setShowNotification] = useState(false);


    const sendEmail = (e) => {
        e.preventDefault();

        // Suggested code may be subject to a license. Learn more: ~LicenseLog:4077981058.
        sendPasswordResetEmail(auth, form.current.email.value)
            .then(() => {
                // Password reset email sent!
                setShowNotification(true)
            }).catch((error) => {
                email_error.style.display = "block";

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <section className="w-5/6 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto my-16 border rounded-xl shadow-sm">
            {showNotification ? <SuccesssNotification message={"Parolanızı sıfırlamak için e-posta adresinize bir link gönderdik"} /> : <></>}
            <div className="p-5">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">Parolanı mı unuttun?</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Parolanı hatırlıyorsan?{""}
                        <button type="button" className="text-indigo-600 decoration-2 hover:underline font-medium" onClick={previousePage}>
                            Giriş yap
                        </button>
                    </p>
                </div>

                <div className="mt-5">

                    <form ref={form} method="POST" onSubmit={sendEmail}>
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2">E-posta</label>
                                <input type="email" id="email" name="email" className="py-3 px-4 block w-full ring-1 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required aria-describedby="email-error" />
                                <p style={{ display: "none" }} className="text-xs text-red-600 mt-2" id="email-error">Lütfen geçerli bir e-posta adresi girin</p>
                            </div>

                            <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700">Gönder</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}