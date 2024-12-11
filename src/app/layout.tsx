import type { Metadata } from "next";
import "./styles/globals.css";
import { poppins } from "@/fonts";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { AuthProvider } from "@/app/providers/AuthProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | En Garden!",
    default: "En Garden!",
  },
  description: "Gardening and landscaping services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
