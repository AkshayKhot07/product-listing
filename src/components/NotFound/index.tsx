import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-5">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-lg">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-6 text-blue-600 text-base hover:underline">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFound;
