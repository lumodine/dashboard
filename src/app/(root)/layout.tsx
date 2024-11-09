import { Footer } from "@/components/app/footer";
import { Header } from "@/components/app/header";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) { 
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
