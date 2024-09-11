import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-400/10 bg-clip-padding backdrop-filter backdrop-blur-lg">
      <div className="text-center text-gray-200/90">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">About Todoit</h1>
        <p className="text-xl mb-4">
          Welcome to <span className="font-semibold text-blue-700">Todoit</span>
          , your innovative and beautiful solution for managing your daily tasks
          with ease and efficiency.
        </p>
        <div className="mb-6 flex justify-center items-center">
          <img
            src="/todoit.png" // Add your app logo here
            alt="todoit logo"
            className="w-24 h-24 rounded-full shadow-lg"
          />
        </div>
        <p className="text-lg text-gray-100/90 mb-6">
          I believe in making task management simple, efficient, and visually
          appealing. Whether you&rsquo;re planning your day or organizing your
          long-term goals,
          <span className="font-semibold text-blue-800"> Todoit </span> is
          designed to help you stay productive and focused.
        </p>
        <blockquote className="text-lg italic font-medium text-sky-500 mb-6">
          &rdquo;Inspiration leads to innovation&rdquo; -
          <a
            className="underline"
            href="https://github.com/alidrisy"
            target="_blank"
          >
            {" "}
            alidrisy
          </a>
        </blockquote>

        <Link to="/" className="btn btn-block btn-blue-600">
          Go back To do it
        </Link>
      </div>
    </div>
  );
};

export default About;
