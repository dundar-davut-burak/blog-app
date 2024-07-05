"use client";
import { useContext, useRef, useState } from "react";
import Link from "next/link";
import { auth } from "@/database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AdminContext } from "@/context/adminContext";

export default function AdminAuthentication() {
    const form = useRef();
    let { setAdmin } = useContext(AdminContext);
    const [display, setDisplay] = useState("hidden");


    const Login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, form.current.email.value, form.current.password.value)
            .then((userCredential) => {
                // Signed in 
                setDisplay("hidden");
                const admin = userCredential.user;
                setAdmin(admin, admin.session = true);
            })
            .catch((error) => {
                setDisplay("block");

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    return (
        <section className="w-5/6 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto my-10 border rounded-xl shadow-sm">
            <div className="p-5">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">Admin Paneli</h1>
                </div>

                <div className="mt-5">
                    <form ref={form} method="POST" onSubmit={Login}>
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2">E-Posta</label>
                                <input type="email" id="email" name="email" className="py-3 px-4 block w-full ring-1 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required aria-describedby="email-error" />
                                <p className={`${display} text-xs text-red-600 mt-2`} id="email-error">E-posta veya parola hatalı</p>
                            </div>

                            <div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="block text-sm mb-2">Parola</label>
                                    <Link className="text-sm text-indigo-600 decoration-2 hover:underline font-medium" href="/parolami-unuttum">Parolanı mı unuttun?</Link>
                                </div>
                                <input type="password" id="password" name="password" className="py-3 px-4 block w-full ring-1 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required aria-describedby="password-error" />
                                <p className={`${display} text-xs text-red-600 mt-2`} id="password-error">E-posta veya parola hatalı</p>
                            </div>
                            <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700">Giriş Yap</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}