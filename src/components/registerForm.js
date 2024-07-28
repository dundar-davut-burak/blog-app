import Link from "next/link";

export default function RegisterForm({ refForm, Register, userNameError, emailError, passwordError }) {
    return (
        <section className="w-5/6 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto my-10 border rounded-xl shadow-sm">
            <div className="p-5">
                {/* Register Panel Title */}
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">Kayıt Ol</h1>
                </div>
                <div className="mt-5">
                    {/* Admin Register Form */}
                    <form ref={refForm} method="POST" onSubmit={Register}>
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="userName" className="block text-sm mb-2">Kullanıcı Adı</label>
                                <input type="text" id="userName" name="userName" className="py-3 px-4 block w-full ring-1 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required aria-describedby="userName-error" />
                                <p className={`${userNameError} text-xs text-red-600 mt-2`} id="userName-error">Geçersiz kullanıcı adı</p>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2">E-Posta</label>
                                <input type="email" id="email" name="email" className="py-3 px-4 block w-full ring-1 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required aria-describedby="email-error" />
                                <p className={`${emailError} text-xs text-red-600 mt-2`} id="email-error">Geçersiz E-posta adresi</p>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm mb-2">Parola</label>
                                <input type="password" id="password" name="password" className="py-3 px-4 block w-full ring-1 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required />
                            </div>
                            <div>
                                <label htmlFor="passwordAgain" className="block text-sm mb-2">Parolanızı tekrar girin</label>
                                <input type="password" id="passwordAgain" name="passwordAgain" className="py-3 px-4 block w-full ring-1 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required aria-describedby="password-error" />
                                <p className={`${passwordError} text-xs text-red-600 mt-2`} id="password-error">Parolalar eşleşmiyor</p>
                            </div>
                            <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700">Kayıt Ol</button>
                        </div>
                        <div className="mt-5 text-center">
                            <p className="text-sm text-gray-600">Hesabın var mı?</p>
                            <Link className="text-md text-center text-indigo-600 decoration-2 hover:underline font-medium mt-5" href="/giris-yap">Giriş Yap</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}