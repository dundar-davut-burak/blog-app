"use client"
import dynamic from 'next/dynamic';
import { useRef } from 'react';
/* 
import { ErrorNotification, SuccesssNotification } from './notifications'; 
*/

/* 
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from '@/database/firebase'; 
*/

const CustomEditor = dynamic(() =>
    import('@/components/textEditor'),
    { ssr: false },
);

export default function AdminNewPostForm() {
    const form = useRef();

    /* 
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false); 
    */

    const handleSubmit = (e) => {
        e.preventDefault();

        /* 
        function ValidateForm() {
            let isValid = true;
            let errorMessages = [];
            const formFields = form.current.querySelectorAll('input, textarea, select');

            formFields.forEach((field) => {
                if (field.required && !field.value) {
                    errorMessages.push(`${field.name} alanı zorunludur.`);
                    isValid = false;
                }
            });

            if (errorMessages.length > 0) {
                alert(errorMessages.join('\n'));
                return false;
            } else {
                return true;
            }
        }

        if (!ValidateForm()) {
            return;
        }

        const docRef = addDoc(collection(db, "posts"), {
            title: form.current.title.value,
            description: form.current.description.value,
            content: form.current.content.value,
            category: form.current.category.value,
            tags: form.current.tags.value.split(','),
            image: form.current.image.files[0],
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
        */
    }

    return (
        <form className="border rounded-xl shadow-sm" method="POST" onSubmit={handleSubmit} ref={form}>
            {/* 
            {showSuccess && <SuccesssNotification message={"Blog gönderisi başarıyla yayınlandı."} />}
            {showError && <ErrorNotification message={"Bir hata oluştu. Lütfen tekrar deneyin."} />} 
            */}
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
                        required
                    />
                </div>
                <div className='my-3'>
                    <label htmlFor="description" className="block text-sm mb-2">Açıklama (description for SEO)</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Lütfen açıklama giriniz. Max. 300 kelime"
                        maxLength={300}
                        required
                    >
                    </textarea>
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
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Etiketler (virgül ile ayırın)"
                        required
                    />
                </div>
                <div className="my-3">
                    <label htmlFor="image" className="block text-sm mb-2">Resim</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        required
                    />
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