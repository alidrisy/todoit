import { useState } from "react";
import toast from "react-hot-toast";
import useTodos from "../zustand/useTodos";
import axios from "axios";

const useAddTodo = () => {
  const { setTodos, todos } = useTodos();
  const [isLoading, setIsLoading] = useState(false);

  const addTodos = async (inputs) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/todos", inputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      setTodos([data, ...todos]);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { addTodos, isLoading };
};

export default useAddTodo;
