/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    EMAILJS_SERVICE_ID: "service_mcsxn1p",
    EMAILJS_TEMPLATE_ID: "template_iq1psto",
    EMAILJS_PUBLIC_KEY: "dZ--NFU1VY_K3KuqI",
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