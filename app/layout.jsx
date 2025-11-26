import "./globals.css";

export const metadata = {
  title: "E2EE Drive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}
