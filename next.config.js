/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    EMAILJS_SERVICE_ID: "service_mcsxn1p",
    EMAILJS_TEMPLATE_ID: "template_iq1psto",
    EMAILJS_PUBLIC_KEY: "dZ--NFU1VY_K3KuqI",
    FIREBASE_API_KEY: "AIzaSyCnu7GqbHjlLJ14C-BpqfXp_agYenQk4zQ",
    FIREBASE_AUTH_DOMAIN:"aklimdakiler-c15e3.firebaseapp.com",
    FIREBASE_PROJECT_ID:"aklimdakiler-c15e3",
    FIREBASE_STORAGE_BUCKET:"aklimdakiler-c15e3.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID:"644182869031",
    FIREBASE_APP_ID:"1:644182869031:web:07c89a908b9bb72ab8ba02",
    FIREBASE_MEASUREMENT_ID:"G-F7WD38NWTM"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;