export const metadata = {
  title: "Login",
  description: "Google login page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
        {children}
      </body>
    </html>
  );
}
