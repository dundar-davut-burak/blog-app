import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aklımdakiler",
  description: "Aklımdakiler: Bireyin İç Dünyası ve Edebiyat",
  keyword: "Aklımdakiler, Bilgehan, Bilgehan Kocabıyık",
  author: "Bilgehan Kocabıyık",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
