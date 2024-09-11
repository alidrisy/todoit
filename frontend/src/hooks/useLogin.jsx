import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (inputs) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/auth/login", inputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAuthUser(data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading };
};

export default useLogin;
