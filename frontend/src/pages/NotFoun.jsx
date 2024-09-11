import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="flex flex-col items-center justify-center w-full p-6 rounded-lg shadow-md bg-gray-400/10 bg-clip-padding backdrop-filter backdrop-blur-lg">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <p className="text-2xl mt-4">Oops! Page not found</p>
          <p className="text-lg mt-2 text-gray-200">
            The page you’re looking for doesn’t exist.
          </p>
          <Link to="/" className="btn btn-block btn-blue-600">
            Go back To do it
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
