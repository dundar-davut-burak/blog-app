"use client"
import { AppContext } from '@/context/appContext';
import { useContext } from 'react';
import { ErrorNotification, SuccesssNotification } from "@/components/notifications";

export default function ProfileInformations({ refForm, handleSubmit, username, biography }) {

    let { showSuccessNotification, showErrorNotification } = useContext(AppContext);

    return (
        <form
            className="px-2 sm:px-4 lg:px-6 mx-auto"
            method="POST"
            ref={refForm}
            onSubmit={handleSubmit}
        >
            {/* Notifications */}
            <div className="my-4 p-3">
                {showSuccessNotification && <SuccesssNotification />}
                {showErrorNotification && <ErrorNotification />}
            </div>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10">
                    {/* Profile Information */}
                    <h2 className="text-base font-semibold leading-7 text-indigo-500">
                        Profilim
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Bu bilgilerin herkese açık olacak. Ne paylaştığına dikkat et.
                    </p>
                    {/* Profile Information Form */}
                    <div className="mt-10 grid grid-cols-1 gap-y-8">
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6"
                            >
                                Kullanıcı Adı
                            </label>

                            <div className="mt-2 flex items-center border border-1 border-gray-300 rounded-md">
                                <span className="select-none pl-3 text-gray-500">@</span>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    defaultValue={username}
                                    className="w-full block py-1.5 pl-1 outline-none"
                                    placeholder="Kullanıcı adı"
                                    title="Kullanıcı adı"
                                    minLength={3}
                                    maxLength={30}
                                    pattern="[a-zA-Z0-9._-]+"
                                    required
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Max. 30 karakter</p>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="photo"
                                className="block text-sm font-medium leading-6"
                            >
                                Profil Fotoğrafı
                            </label>
                            <div className="mt-2 p-2 border border-1 border-gray-300 rounded-md">
                                <input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    className="w-full block py-1.5 outline-none"
                                    placeholder="Profil fotoğrafı"
                                    title="Profil fotoğrafı"
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium leading-6"
                            >
                                Biyografi
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows="5"
                                    defaultValue={biography}
                                    className="block p-3 w-full outline-none border border-1 border-gray-300 rounded-md"
                                    placeholder="Biyografi"
                                    title="Biyografi"
                                    minLength={50}
                                    maxLength={300}
                                    pattern="[a-zA-ZöçıİğüÖÇĞÜşŞ0-9.,!?: ]+"
                                    required
                                ></textarea>
                                <p className="text-xs text-gray-500 my-2">
                                    Min. 50 karakter, Max. 300 karakter
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
                >
                    Kaydet
                </button>
            </div>
        </form>
    )
}