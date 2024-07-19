"use client";
import { useContext, useRef, useState } from "react";
import { auth } from "@/database/firebase";
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  updateEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import AccountInformations from "@/components/shared_components/accountInformations";
import { AppContext } from "@/context/appContext";

export default function AccountSettings() {
  // States
  let { setShowSuccessNotification, setShowErrorNotification, setMessageNotification } = useContext(AppContext);
  // using Form Ref for get values
  const form = useRef();
  // Router
  const navigate = useRouter();
  // Change Email
  const changeEmail = async (e) => {
    e.preventDefault();
    // Update Email
    try {
      // Update Email
      await updateEmail(auth.currentUser, form.current.email.value)
        .then(() => {
          // Email updated
          setShowSuccessNotification(true);
          setMessageNotification("E-posta adresiniz güncellendi.");
          // Redirect to Admin Dashboard
          setTimeout(() => {
            navigate.refresh();
          }, 2000);
        })
        .catch((error) => {
          // Handle Errors
          setShowErrorNotification(true);
          setMessageNotification("E-posta adresiniz güncellenemedi." + error);
        });
    } catch (error) {
      // An error happened.
      setShowErrorNotification(true);
      setMessageNotification("Bir hata oluştu. Lütfen tekrar deneyin." + error);
    }
  };
  // Change Password
  const sendChangePasswordEmail = async (e) => {
    e.preventDefault();
    // Send Password Reset Email
    try {
      // Send Password Reset Email
      await sendPasswordResetEmail(auth, auth.currentUser.email)
        .then(() => {
          // Password reset email sent
          setShowSuccessNotification(true);
          setMessageNotification("Parola sıfırlama linki gönderildi");
          // Redirect to Admin Dashboard
          setTimeout(() => {
            navigate.refresh();
          }, 2000);
        })
        .catch((error) => {
          // Handle Errors
          setShowErrorNotification(true);
          setMessageNotification("Parola sıfırlama linki gönderilemedi." + error);
        });
    } catch (error) {
      // An error happened.
      setShowErrorNotification(true);
      setMessageNotification("Bir hata oluştu. Lütfen tekrar deneyin." + error);
    }
  };
  // Email Verification
  const sendEmail = async (e) => {
    e.preventDefault();
    // Send Email Verification
    try {
      await sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent
          setShowSuccessNotification(true);
          setMessageNotification("E-posta doğrulanma linki gönderildi.");
          // Redirect to Admin Dashboard
          setTimeout(() => {
            navigate.refresh();
          }, 2000);
        })
        .catch((error) => {
          // Handle Errors
          setShowErrorNotification(true);
          setMessageNotification("E-posta doğrulanma linki gönderilemedi." + error);
        });
    } catch (error) {
      // An error happened.
      setShowErrorNotification(true);
      setMessageNotification("Bir hata oluştu. Lütfen tekrar deneyin." + error);
    }
  };

  return (
    <AccountInformations
      refForm={form}
      changeEmail={changeEmail}
      sendChangePasswordEmail={sendChangePasswordEmail}
      sendEmail={sendEmail}
    />
  );
}
