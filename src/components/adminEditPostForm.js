"use client"
import { useState, useEffect, useRef } from "react";
import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/database/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import { ErrorNotification, SuccesssNotification } from './notifications';

const AdminEditPostForm = () => {
    const form = useRef();

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState(
        "Bir hata oluştu. Lütfen tekrar deneyin."
    );

    const [post, setPost] = useState({
        title: "",
        description: "",
        content: "",
        category: "",
        tags: "",
        image: "",
        published: true
    });

    const { id } = useParams();
    const navigate = useRouter();

    useEffect(() => {
        const getPost = async () => {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPost(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        getPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = doc(db, "posts", id);
            await updateDoc(docRef, {
                title: form.current.title.value,
                description: form.current.description.value,
                content: form.current.content.value,
                category: form.current.category.value,
                tags: form.current.tags.value.split(','),
                image: form.current.image.value === '' ? post.image : form.current.image.value,
                published: form.current.published.checked,
            }).catch((error) => {
                setShowError(true);
                setMessage('Blog gönderisi güncellenemedi. Lütfen tekrar deneyin.' + error);
            });

            const formData = new FormData(form.current);

            const image = formData.get('image');
            const storageRef = ref(storage, `posts-images/${image.name}`);

            if(image){
                await uploadBytes(storageRef, image).catch((error) => {
                    setShowError(true);
                    setMessage('Resim yükleme işlemi başarısız oldu. Lütfen tekrar deneyin.' + error);
                });
            }

            setShowSuccess(true);
            setMessage("Blog gönderisi başarıyla güncellendi.");

            setTimeout(() => {
                navigate.push("/admin/blog");
            }, 2000);
        } catch (error) {
            setShowError(true);
            setMessage('Blog gönderisi güncellenemedi.' + error);
        }
    };

    return (
        <form className="border rounded-xl shadow-sm" method="POST" onSubmit={handleSubmit} ref={form}>

            {showSuccess && <SuccesssNotification message={message} />}
            {showError && <ErrorNotification message={message} />}

            <div className="flex flex-col text-center w-full mt-12 -m-y-4">
                <h1 className="sm:text-3xl text-2xl font-medium title-font my-3 text-yellow-600">
                    Blog Gönderinizi Güncelleyin
                </h1>
            </div>
            <div className="flex flex-col px-6 py-4">
                <div className='my-3'>
                    <label htmlFor="title" className="block text-sm mb-2">Başlık</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={post.title}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-yellow-500 focus:ring-2"
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
                        defaultValue={post.description}
                        rows={3}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-yellow-500 focus:ring-2"
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
                        defaultValue={post.content}
                        rows={20}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-yellow-500 focus:ring-2"
                        placeholder="Lütfen içerik giriniz"
                        title='Lütfen içerik giriniz'
                        minLength={500}
                        maxLength={3000}
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
                        defaultValue={post.category}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-yellow-500 focus:ring-2"
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
                        defaultValue={post.tags}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-yellow-500 focus:ring-2"
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
                        type="file"
                        id="image"
                        name="image"
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-yellow-500 focus:ring-2"
                        placeholder="Gönderinizin için resim dosyası yükleyiniz"
                        title='Gönderinizin için resim dosyası yükleyiniz'
                        accept="image/*"
                    />
                    <p className="text-xs text-gray-500 mt-2">Max. 5mb</p>
                </div>
                <div className='my-3 flex items-center'>
                    <label htmlFor="published" className="text-sm mx-2">Yayına alınsın mı ?</label>
                    <input
                        id="published"
                        name="published"
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600"
                    />
                </div>
                <div className="p-2 my-4 w-full">
                    <button
                        type="submit"
                        className="w-full text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
                    >
                        Güncelle
                    </button>
                </div>
            </div>
        </form>
    )
};

export default AdminEditPostForm;