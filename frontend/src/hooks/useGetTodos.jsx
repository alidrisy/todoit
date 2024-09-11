import { useState } from "react";
import toast from "react-hot-toast";
import useTodos from "../zustand/useTodos";
import axios from "axios";

const useGetTodos = () => {
  const { setTodos } = useTodos();
  const [isLoading, setIsLoading] = useState(false);

  const getTodos = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/todos");
      console.log(data);
      setTodos(data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { getTodos, isLoading };
};

export default useGetTodos;
