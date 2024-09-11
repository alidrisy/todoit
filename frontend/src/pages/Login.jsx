import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { login, isLoading } = useLogin();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(inputs.email) || !inputs.password) {
      toast.error("All fields are required");

      return;
    }

    login(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/10 bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-white">
          Login
          <span className="text-blue-600"> Todoit</span>
        </h1>

        <form onSubmit={handleSubmitForm}>
          <div>
            <label className="label p-2 ">
              <span className="text-base label-text text-white">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter email"
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
          <Link
            to="/signup"
            className="text-sm  hover:underline text-white hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={isLoading}>
              {!isLoading ? (
                "Login"
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
export default Login;
