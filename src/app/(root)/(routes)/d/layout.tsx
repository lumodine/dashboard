import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";

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
