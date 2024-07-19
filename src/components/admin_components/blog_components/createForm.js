"use client"
import { useContext, useRef } from 'react';
import { auth, db, storage } from '@/database/firebase';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import PostForm from '@/components/postForm';
import { AppContext } from '@/context/appContext';

export default function CreateForm() {
    // using Form Ref for get values
    const form = useRef();
    // Router
    const navigate = useRouter();

    // Notifications states
    let { setShowSuccessNotification, setShowErrorNotification, setMessageNotification } = useContext(AppContext)

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // get image from form and create storage reference
        const formData = new FormData(form.current);
        const image = formData.get('image');
        const storageRef = ref(storage, `/posts-images/${image.name}`);

        // Add Post
        try {
            addDoc(collection(db, "posts"), {
                title: form.current.title.value,
                description: form.current.description.value,
                content: form.current.content.value,
                category: form.current.category.value,
                tags: form.current.tags.value.split(','),
                image: storageRef.name,
                writer: auth.currentUser.displayName !== null ? auth.currentUser.displayName : auth.currentUser.email,
                date: new Date().toISOString().split('T')[0],
                published: form.current.published.checked,
            }).catch((error) => {
                setShowErrorNotification(true);
                setMessageNotification('Gönderi yayınlanmadı. Lütfen tekrar deneyin.' + error);
            });
            // Upload Image
            await uploadBytes(storageRef, image).catch((error) => {
                setShowErrorNotification(true);
                setMessageNotification('Resim yükleme işlemi başarısız oldu. Lütfen tekrar deneyin.' + error);
            });
            // Show Success Message
            setShowSuccessNotification(true);
            setMessageNotification('Gönderi yayınlandı.');
            // Redirect to Admin Dashboard
            setTimeout(() => {
                navigate.push("/admin/blog");
            }, 2000);

        } catch (error) {
            // Show Error Message
            setShowErrorNotification(true);
            setMessageNotification('Gönderi yayınlanmadı.' + error);
        }

    }

    return (
        <PostForm
            handleSubmit={handleSubmit}
            refForm={form}
            formTitle="Blog Gönderisi Oluştur"
            buttonValue="Oluştur"
            isRequired={true}
        />
    )
};