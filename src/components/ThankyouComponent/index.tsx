import { Link } from "react-router-dom";

const ThankyouComponent = () => {
  return (
    <div className="flex items-center justify-center h-full w-full pt-[100px]">
      <div className="flex flex-col gap-2 items-center">
        <p>Thankyou for shopping with us, See you soon!</p>
        <Link to="/" className="home-link">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
};

export default ThankyouComponent;
