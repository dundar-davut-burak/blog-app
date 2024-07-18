"use client";
import { useContext, useRef, useState } from "react";
import Link from "next/link";
import { auth } from "@/database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AdminContext } from "@/context/adminContext";

export default function AdminAuthentication() {
    // using Form Ref for get values
    const form = useRef();
    // Admin Context
    let { setAdmin } = useContext(AdminContext);
    // Error States
    const [emailErrordisplay, setEmailError] = useState("hidden");
    const [passwordError, setPasswordError] = useState("hidden");

    const Login = (e) => {

        e.preventDefault();

        if (form.current.email.value !== process.env.ADMIN_MAIL_ADRESS) {

            setEmailError("block");
            form.current.email.value = "";
            form.current.password.value = "";

            return;
        } else {
            try {
                signInWithEmailAndPassword(auth, form.current.email.value, form.current.password.value)
                    .then((userCredential) => {
                        // Signed in
                        const admin = userCredential.user;
                        setAdmin(admin, admin.session = true);
                    })
                    .catch((error) => {
                        //Handle Errors
                        setPasswordError("block" + error);
                    });
            } catch (error) {
                // An error happened.
                console.log(error);
            }
        }
    };

    return (
        <section className="w-5/6 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto my-10 border rounded-xl shadow-sm">
            <div className="p-5">
                {/* Admin Login Panel Title */}
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">Admin Paneli</h1>
                </div>
                <div className="mt-5">
                    {/* Admin Login Form */}
                    <form ref={form} method="POST" onSubmit={Login}>
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2">E-Posta</label>
                                <input type="email" id="email" name="email" className="py-3 px-4 block w-full ring-1 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required aria-describedby="email-error" />
                                <p className={`${emailErrordisplay} text-xs text-red-600 mt-2`} id="email-error">E-posta hatalı</p>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="block text-sm mb-2">Parola</label>
                                    <Link className="text-sm text-indigo-600 decoration-2 hover:underline font-medium" href="/parolami-unuttum">Parolanı mı unuttun?</Link>
                                </div>
                                <input type="password" id="password" name="password" className="py-3 px-4 block w-full ring-1 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required aria-describedby="password-error" />
                                <p className={`${passwordError} text-xs text-red-600 mt-2`} id="password-error">Parola hatalı</p>
                            </div>
                            <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700">Giriş Yap</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}