import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AppContextProvider from "@/context/appContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aklımdakiler",
  description: "Aklımdakiler web sayfası",
  icon: "../public/favicon.ico",
};

export default function RootLayout({ children }) {

  return (
    <html lang="tr">
      <body className={inter.className}>
        <AppContextProvider>
          <Header />
          {children}
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}