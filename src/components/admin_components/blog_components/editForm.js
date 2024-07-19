"use client"
import { useState, useEffect, useRef, useContext } from "react";
import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/database/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import PostForm from "@/components/postForm";
import { AppContext } from "@/context/appContext";

export default function EditForm() {
    // using Form Ref for get values
    const form = useRef();

    // Notifications states
    let { setShowSuccessNotification, setShowErrorNotification, setMessageNotification } = useContext(AppContext)

    // Post State
    const [post, setPost] = useState({
        title: "",
        description: "",
        content: "",
        category: "",
        tags: "",
        image: "",
        published: true
    });

    // Get Post ID
    const { id } = useParams();
    // Router
    const navigate = useRouter();

    // Get Post
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

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Update Post
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
                // Show Error Message
                setShowErrorNotification(true);
                setMessageNotification('Blog gönderisi güncellenemedi. Lütfen tekrar deneyin.' + error);
            });
            // get image from form and create storage reference
            const formData = new FormData(form.current);
            const image = formData.get('image');
            const storageRef = ref(storage, `/posts-images/${image.name}`);

            // Upload Image
            if (image !== null || image !== undefined || image !== '') {
                await uploadBytes(storageRef, image).catch((error) => {
                    setShowErrorNotification(true);
                    setMessageNotification('Resim yükleme işlemi başarısız oldu. Lütfen tekrar deneyin.' + error);
                });
            }

            // Show Success Message
            setShowSuccessNotification(true);
            setMessageNotification("Blog gönderisi başarıyla güncellendi.");
            // Redirect to Admin Dashboard
            setTimeout(() => {
                navigate.push("/admin/blog");
            }, 2000);
        } catch (error) {
            // Show Error Message
            setShowErrorNotification(true);
            setMessageNotification('Blog gönderisi güncellenemedi.' + error);
        }
    };

    return (
        <PostForm
            handleSubmit={handleSubmit}
            refForm={form}
            formTitle="Blog Gönderisi Düzenle"
            title={post.title}
            description={post.description}
            content={post.content}
            category={post.category}
            tags={post.tags}
            image={post.image}
            published={post.published}
            buttonValue="Güncelle"
            isRequired={false}
        />
    )
};