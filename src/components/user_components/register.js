"use client";
import { useContext, useRef, useState } from "react";
import { auth, db } from "@/database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AppContext } from "@/context/appContext";
import RegisterForm from "../registerForm";
import { useRouter } from "next/navigation";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export default function Register() {
    // using Form Ref for get values
    const form = useRef();
    // App Context
    let { setUser } = useContext(AppContext);
    // Error States
    const [userNameError, setUserNameError] = useState("hidden");
    const [emailError, setEmailError] = useState("hidden");
    const [passwordError, setPasswordError] = useState("hidden");
    // Router 
    const navigate = useRouter();

    // Search User
    const searchUserNames = async (username) => {
        try {
            // Query Firestore for user
            const q = query(collection(db, "users"), where("username", "==", username));
            // Get Docs
            const querySnapshot = await getDocs(q);
            // Return true if user doesn't exist
            return querySnapshot.empty;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Handle Submit
    const Register = async (e) => {
        e.preventDefault();
        // Validate Form
        if (form.current.password.value !== form.current.passwordAgain.value) {
            setPasswordError("block");
            return;
        }
        // Check if username is available
        const isUsernameAvailable = await searchUserNames(form.current.userName.value);
        // If username is not available, show error
        if (!isUsernameAvailable) {
            setPasswordError("hidden");
            setUserNameError("block");
            return;
        }
        // Create User
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.current.email.value, form.current.password.value);
            // Hide Error
            setEmailError("hidden");
            setPasswordError("hidden");
            setUserNameError("hidden");
            // Set User
            const user = userCredential.user;
            setUser(user, user.session = true);
            // Add User to Firestore
            try {
                await addDoc(collection(db, "users"), {
                    username: form.current.userName.value,
                    email: form.current.email.value,
                    about: "",
                    photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                });
            } catch (error) {
                console.error(error);
            }

            // redirect to home page
            setTimeout(() => {
                navigate.push("/");
            }, 500);
        } catch (error) {
            console.error(error);
            // Show Error
            setUserNameError("hidden");
            setPasswordError("hidden");
            setEmailError("block");
        }
    }

    return <RegisterForm
        refForm={form}
        Register={Register}
        userNameError={userNameError}
        emailError={emailError}
        passwordError={passwordError}
    />
}