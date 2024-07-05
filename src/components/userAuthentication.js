"use client";
import { useRef, useState } from "react";
import Link from "next/link";

export default function AdminAuthentication() {
    const form = useRef();
    const [display, setDisplay] = useState("hidden");


    const Login = (e) => {
        e.preventDefault();
        setDisplay("block");
    };

    return (
        <section className="w-5/6 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto my-10 border rounded-xl shadow-sm">
            <div className="p-5">
                <Link
                    href={"/"}
                    className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
                >
                    <Image alt={"Logo"} src={"/logo.png"} width={64} height={64} />
                    <span className="ml-3 text-xl">Aklımdakiler</span>
                </Link>

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