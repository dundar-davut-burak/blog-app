"use client";
import { useContext, useRef, useState } from "react";
import { auth } from "@/database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AppContext } from "@/context/appContext";
import LoginForm from "../loginForm";
import { useRouter } from "next/navigation";

export default function Login() {
    // using Form Ref for get values
    const form = useRef();
    // App Context
    let { setUser } = useContext(AppContext);
    // Error States
    const [emailError, setEmailError] = useState("hidden");
    const [passwordError, setPasswordError] = useState("hidden");
    // Router 
    const navigate = useRouter();

    // Login Function
    const Login = (e) => {

        e.preventDefault();

        try {
            signInWithEmailAndPassword(auth, form.current.email.value, form.current.password.value)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    setUser(user, user.session = true);
                    // ...
                    setEmailError("hidden");
                    setPasswordError("hidden");
                    // redirect to home page
                    setTimeout(() => {
                        navigate.push("/");
                    }, 500);
                })
                .catch(() => {
                    //Handle Errors
                    setPasswordError("block");
                    setEmailError("block");
                });
        } catch (error) {
            // An error happened.
            console.log(error);
        }
    };

    return (
        <LoginForm
            refForm={form}
            Login={Login}
            emailError={emailError}
            passwordError={passwordError}
        />
    )
}