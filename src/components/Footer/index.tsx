import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-3 px-3 bg-gray-700 text-white font-bold text-base flex items-center justify-center">
      <div className="flex items-center gap-1">
        <p>Made with React.js</p>
        <FaHeart className="text-red-600" />
      </div>
    </footer>
  );
};

export default Footer;
