import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/animations.css";

import { poppins } from "@/fonts";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { AuthProvider } from "@/app/providers/AuthProvider";
import QueryProvider from "@/app/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

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
      <QueryProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${poppins.className} antialiased`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </QueryProvider>
    </AuthProvider>
  );
}
