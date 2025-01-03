import Navbar from "@/components/Navabr";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.className} antialiased`}
      >
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
