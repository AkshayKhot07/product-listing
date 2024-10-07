import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <div>
          <Navbar />
          <main className="container mx-auto px-5 max-w-[1241px] sm:max-w-[1240px]">
            {children}
          </main>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </> 
  );
}
