import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <section className="w-1/3 mx-auto my-16 border rounded-xl shadow-sm">
            <div className="p-4">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">Parolanı mı unuttun?</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Parolanı hatırlıyorsan?{""}
                        <Link className="text-indigo-600 decoration-2 hover:underline font-medium" href="/admin">
                            Giriş yap
                        </Link>
                    </p>
                </div>

                <div className="mt-5">

                    <form>
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="fp_s_email" className="block text-sm mb-2">E-posta</label>
                                <div className="relative">
                                    <input type="email" id="fp_s_email" name="fp_s_email" className="py-3 px-4 block w-full ring-1 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required aria-describedby="fp_s_email-error" />
                                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                        <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="hidden text-xs text-red-600 mt-2" id="fp_s_email-error">Lütfen geçerli bir e-posta adresi girin</p>
                            </div>

                            <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700">Gönder</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}