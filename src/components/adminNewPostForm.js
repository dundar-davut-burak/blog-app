"use client"
import { useRef, useState } from 'react';
import { auth, db } from '@/database/firebase';
import { collection, addDoc } from "firebase/firestore";
import { ErrorNotification, SuccesssNotification } from './notifications';

export default function AdminNewPostForm() {
    const form = useRef();

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            addDoc(collection(db, "posts"), {
                title: form.current.title.value,
                description: form.current.description.value,
                content: form.current.content.value,
                category: form.current.category.value,
                tags: form.current.tags.value.split(','),
                image: form.current.image.value,
                writer: auth.currentUser.displayName !== null ? auth.currentUser.displayName : auth.currentUser.email,
                date: new Date().toISOString().split('T')[0],
                published: true
            }).then(() => {
                form.current.reset();
                setShowSuccess(true);
                setShowError(false);
                setTimeout(() => {
                    window.location.href = "/admin/blog";
                }, 3000);
            }).catch((error) => {
                setShowError(true);
                setShowSuccess(false);
                console.error("Error adding document: ", error);
            });
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <form className="border rounded-xl shadow-sm" method="POST" onSubmit={handleSubmit} ref={form}>

            {showSuccess && <SuccesssNotification message={"Blog gönderisi başarıyla yayınlandı."} />}
            {showError && <ErrorNotification message={"Bir hata oluştu. Lütfen tekrar deneyin."} />}

            <div className="flex flex-col text-center w-full mt-12 -m-y-4">
                <h1 className="sm:text-3xl text-2xl font-medium title-font my-3 text-indigo-600">
                    Yeni Blog Gönderisi Yayınla
                </h1>
            </div>
            <div className="flex flex-col px-6 py-4">
                <div className='my-3'>
                    <label htmlFor="title" className="block text-sm mb-2">Başlık</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Lütfen başlık giriniz"
                        title='Lütfen başlık giriniz'
                        minLength={5}
                        maxLength={100}
                        pattern="[a-zA-ZöçıİğüÖÇĞÜşŞ0-9.,!? ]+"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-2">Max. 100 karakter</p>
                </div>
                <div className='my-3'>
                    <label htmlFor="description" className="block text-sm mb-2">Açıklama (description for SEO)</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Lütfen açıklama giriniz. Max. 300 kelime"
                        title='Lütfen açıklama giriniz. Max. 300 kelime'
                        minLength={50}
                        maxLength={300}
                        pattern="[a-zA-ZöçıİğüÖÇĞÜşŞ0-9.,!? ]+"
                        required
                    >
                    </textarea>
                    <p className="text-xs text-gray-500 mt-2">Max. 300 kelime</p>
                </div>
                <div className='my-3'>
                    <label htmlFor="content" className="block text-sm mb-2">İçerik</label>
                    <textarea
                        id="content"
                        name="content"
                        rows={20}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Lütfen içerik giriniz"
                        title='Lütfen içerik giriniz'
                        minLength={500}
                        maxLength={2000}
                        pattern="[a-zA-ZöçıİğüÖÇĞÜşŞ0-9.,!? ]+"
                        required
                    >
                    </textarea>
                    <p className="text-xs text-gray-500 mt-2">Min. 500 karakter, Max. 2000 karakter</p>
                </div>
                <div className="my-3">
                    <label htmlFor="category" className="block text-sm mb-2">Kategori</label>
                    <select
                        id="category"
                        name="category"
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        defaultValue="Seçiniz"
                        title="Kategori seçiniz"
                        required
                    >
                        <option value="default" disabled>Seçiniz</option>
                        <option value="KulturVeSanat">Kültür ve Sanat</option>
                        <option value="KisiselGelisim">Kişisel Gelişim</option>
                        <option value="Teknoloji">Teknoloji</option>
                        <option value="Dıger">Diğer</option>
                    </select>
                </div>
                <div className="my-3">
                    <label htmlFor="tags" className="block text-sm mb-2">Etiketler (keywords for SEO)</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Etiketler (virgül ile ayırın)"
                        title="Etiketler (virgül ile ayırın)"
                        minLength={2}
                        maxLength={100}
                        pattern="[a-zA-ZöçıİğüÖÇĞÜşŞ0-9,]+"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-2">Max. 100 karakter. Virgül den sonra boşluk bırakmayın.</p>
                </div>
                <div className="my-3">
                    <label htmlFor="image" className="block text-sm mb-2">Resim</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Resim url adresi seçiniz"
                        title='Resim url adresi seçiniz'
                        required
                    />
                    <p className="text-xs text-gray-500 mt-2">Resim url adresi seçiniz</p>
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
        </form>
    )
}