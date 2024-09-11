import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (inputs, setInputs) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/auth/signup", inputs);
      setAuthUser(data);
      setInputs({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, signup };
};

export default useSignup;
