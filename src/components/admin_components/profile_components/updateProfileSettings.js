"use client";
import { useRef, useState, useEffect, useContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/database/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import ProfileInformations from "@/components/shared_components/profileInformations";
import { AppContext } from "@/context/appContext";

export default function UpdateProfileSettings() {
  // using Form Ref for get values
  const form = useRef();
  // States
  const [data, setData] = useState({
    username: "",
    photo: "",
    about: "",
  });
  // Notifications states
  let { setShowSuccessNotification, setShowErrorNotification, setMessageNotification } = useContext(AppContext)
  // Get User Data
  const id = auth.currentUser.uid;
  // Router
  const navigate = useRouter();
  // Get User Data
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getData();
  }, [id]);
  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update User Data
    try {
      // Get Form Data
      const docRef = doc(db, "users", id);
      const formData = new FormData(form.current);
      // Get Form Values
      const user = auth.currentUser;
      const image = formData.get('photo');
      // Create Storage References
      const storageRef = ref(storage, `/users-images/${user.uid}/${image.name}`);
      // Update User Data
      await updateDoc(docRef, {
        username: form.current.username.value,
        photo: storageRef.name === '' ? data.photo : storageRef.name,
        about: form.current.about.value,
      }).catch((error) => {
        // Show Error Message
        setShowErrorNotification(true);
        setMessageNotification('Profilim güncellenemedi. Lütfen tekrar deneyin.' + error);
      });
      // Update Firebase User Profile
      await updateProfile(user, {
        displayName: form.current.username.value,
        photoURL: storageRef.name === '' ? data.photo : storageRef.name,
      }).catch((error) => {
        // Show Error Message
        setShowErrorNotification(true);
        setMessageNotification('Profilim güncellenemedi. Lütfen tekrar deneyin.' + error);
      });
      // validate and upload image
      if (image !== null || image !== undefined || image !== '') {
        await uploadBytes(storageRef, image).catch((error) => {
          // Show Error Message
          setShowErrorNotification(true);
          setMessageNotification('Resim yükleme işlemi başarısız oldu. Lütfen tekrar deneyin.' + error);
        });
      }
      // Show Success Message
      setShowSuccessNotification(true);
      setMessageNotification("Profilim başarıyla güncellendi.");
      // Redirect to Admin Dashboard
      setTimeout(() => {
        navigate.refresh();
      }, 2000);
    } catch (error) {
      // Show Error Message
      setShowErrorNotification(true);
      setMessageNotification('Profilim güncellenemedi.' + error);
    }
  };

  return (
    <ProfileInformations
      refForm={form}
      handleSubmit={handleSubmit}
      username={data.username}
      biography={data.about}
    />
  )
};