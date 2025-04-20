import '@/app/ui/global.css';
import { cinzel } from "@/app/ui/font";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cinzel.className} antialiased`}>{children}</body>
    </html>
  );
}