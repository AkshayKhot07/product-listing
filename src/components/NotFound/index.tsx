import { Link } from "react-router-dom";
import "./NotFound.css"; // Import the CSS file

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="error-code">404</h1>
      <p className="error-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="home-link">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFound;
