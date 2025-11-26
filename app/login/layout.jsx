export const metadata = {
  title: "Login - E2EE Drive",
};

export default function LoginLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
      {children}
    </div>
  );
}
