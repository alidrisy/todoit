import { useState } from "react";
import toast from "react-hot-toast";
import useTodos from "../zustand/useTodos";
import axios from "axios";

const useUpdateTodo = () => {
  const { setTodos, todos } = useTodos();
  const [isLoading, setIsLoading] = useState(false);

  const updateTodo = async (inputs, id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(`/api/todos/${id}`, inputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodos = todos.map((todo) => (todo.id === data.id ? data : todo));
      setTodos(newTodos);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTodo, isLoading };
};

export default useUpdateTodo;
