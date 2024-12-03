import { Footer } from "@/components/common/footer";
import { Header } from "./components/header";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({
  children,
}: Readonly<AuthLayoutProps>) {
  return (
    <div className="flex flex-col sm:h-screen w-full items-center justify-center p-4 gap-4">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
