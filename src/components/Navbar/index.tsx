import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-5 px-3 bg-gray-700 text-white font-bold text-2xl">
      <div className="w-fit">
        <Link to={"/"}>
          <p>Product Listing</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
