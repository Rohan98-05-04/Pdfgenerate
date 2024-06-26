import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const inter = Inter({ subsets: ["latin"] });
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "PDF Generate ",
  description: "We can generate Pdf",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
     
      </head>
      <body className={inter.className}>{children}
      <ToastContainer  autoClose={2000} />
      </body>
    </html>
  );
}
