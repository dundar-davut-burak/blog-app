"use client"
import dynamic from 'next/dynamic';
import { useRef } from 'react';

const CustomEditor = dynamic(() => import('@/components/textEditor'), { ssr: false });

export default function AdminNewPostForm() {
    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className="border rounded-xl shadow-sm" method="POST" onSubmit={handleSubmit} ref={form}>
            <div className="flex flex-col text-center w-full mt-12 -m-y-4">
                <h1 className="sm:text-3xl text-2xl font-medium title-font my-3 text-indigo-600">
                    Yeni Blog Gönderisi Yayınla
                </h1>
            </div>
            <div className="flex flex-col px-6 py-4">
                <div className='my-3'>
                    <label htmlFor="title" className="block text-sm mb-2">Başlık</label>
                    <input type="text" id="title" name="title" className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" placeholder="Lütfen başlık giriniz" required />
                </div>
                <div className='my-3'>
                    <label htmlFor="description" className="block text-sm mb-2">Açıklama (description for SEO)</label>
                    <textarea id="description" name="description" rows={3} className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" placeholder="Lütfen açıklama giriniz. Max. 300 kelime" maxLength={300} required></textarea>
                </div>
                <div className='my-3'>
                    <label htmlFor="content" className="block text-sm mb-2">İçerik</label>
                    <CustomEditor />
                </div>
                <div className="my-3">
                    <label htmlFor="category" className="block text-sm mb-2">Kategori</label>
                    <select id="category" name="category" className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required>
                        <option value="default" disabled>Seçiniz</option>
                        <option value="KulturVeSanat">Kültür ve Sanat</option>
                        <option value="KisiselGelisim">Kişisel Gelişim</option>
                        <option value="Teknoloji">Teknoloji</option>
                        <option value="Dıger">Diğer</option>
                    </select>
                </div>
                <div className="my-3">
                    <label htmlFor="tags" className="block text-sm mb-2">Etiketler (keywords for SEO)</label>
                    <input type="text" id="tags" name="tags" className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" placeholder="Etiketler (virgül ile ayırın)" required />
                </div>
                <div className="my-3">
                    <label htmlFor="image" className="block text-sm mb-2">Resim</label>
                    <input type="file" id="image" name="image" accept="image/*" className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2" required />
                </div>
                <div className="flex flex-wrap -m-2 my-3">
                    <div className="p-2 w-1/2">
                        <div className="relative">
                            <label htmlFor="writer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Yazar</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                </span>
                                <input type="text" id="writer" name='writer' className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Bilgehan Kocabıyık" disabled required />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 w-1/2">
                        <div className="relative">
                            <label
                                htmlFor="date"
                                className="leading-7 text-sm text-gray-600"
                            >
                                Yayınlanma Tarihi
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                value={new Date().toISOString().split('T')[0]}
                                required
                                disabled
                            />
                        </div>
                    </div>
                    <div className="p-2 my-4 w-full">
                        <button
                            type="submit"
                            className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                            Yayınla
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}