import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import { EmailVerificationBanner } from "@/components/auth/EmailVerificationBanner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="md:w-[85%] w-full mx-auto min-h-screen px-4">{children}</div>
      <Footer />
      <EmailVerificationBanner />
    </>
  );
}
