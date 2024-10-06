// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
import "./Layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex-wrapper">
        <div>
          {/* <Navbar /> */}
          <nav
            style={{
              padding: "20px 0px 20px 0px",
              border: "1px solid black"
            }}
          >
            Navbar
          </nav>
          <main className="container">{children}</main>
        </div>
        <div className="footer">
          <footer
            style={{
              padding: "20px 0px 20px 0px",
                            border: "1px solid black"
            }}
          >
            Footer
          </footer>
        </div>
      </div>
    </>
  );
}
