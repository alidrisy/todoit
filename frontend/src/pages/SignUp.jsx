import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../hooks/useSignup";
import toast from "react-hot-toast";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signup, isLoading } = useSignup();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      !inputs.name ||
      !inputs.email ||
      !inputs.password ||
      !inputs.confirmPassword ||
      !inputs.gender
    ) {
      toast.error("All fields are required");
      return;
    }

    if (!EMAIL_REGEX.test(inputs.email)) {
      toast.error("Please use a valid @egx.com email address.");
      return;
    }

    if (inputs.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    signup(inputs, setInputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/10 bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-white">
          Sign Up <span className="text-blue-600"> Todoit</span>
        </h1>

        <form onSubmit={handleSubmitForm} className="pt-6">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text text-white">Email</span>
            </label>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              className="w-full input input-bordered h-10"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-white">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={isLoading}
            >
              {!isLoading ? (
                "Sign up"
              ) : (
                <div className="lds-ellipsis text-white">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
