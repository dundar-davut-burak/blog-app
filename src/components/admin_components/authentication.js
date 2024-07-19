"use client";
import { useContext, useRef, useState } from "react";
import { auth } from "@/database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AdminContext } from "@/context/adminContext";
import LoginForm from "../loginForm";

export default function Authentication() {
    // using Form Ref for get values
    const form = useRef();
    // Admin Context
    let { setAdmin } = useContext(AdminContext);
    // Error States
    const [emailError, setEmailError] = useState("hidden");
    const [passwordError, setPasswordError] = useState("hidden");

    const Login = (e) => {

        e.preventDefault();

        if (form.current.email.value !== process.env.ADMIN_MAIL_ADRESS) {

            setEmailError("block");
            form.current.email.value = "";
            form.current.password.value = "";

            return;
        } else {
            try {
                signInWithEmailAndPassword(auth, form.current.email.value, form.current.password.value)
                    .then((userCredential) => {
                        // Signed in
                        const admin = userCredential.user;
                        setAdmin(admin, admin.session = true);
                    })
                    .catch((error) => {
                        //Handle Errors
                        setPasswordError("block" + error);
                    });
            } catch (error) {
                // An error happened.
                console.log(error);
            }
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