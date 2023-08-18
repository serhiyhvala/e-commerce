import {ClerkProvider} from "@clerk/nextjs";
import "./globals.css";
import type {Metadata} from "next";
import {Urbanist} from "next/font/google";
import {Toaster} from "react-hot-toast";
import ThemeProvider from "@/providers/themeProvider";

const roboto = Urbanist({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "STORE",
    icons: {
        icon: "/favicon.png"
    }
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={roboto.className}>
            <Toaster/>
            <ThemeProvider>
                {children}
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}
