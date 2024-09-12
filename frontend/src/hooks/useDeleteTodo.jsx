import { useState } from "react";
import toast from "react-hot-toast";
import useTodos from "../zustand/useTodos";
import axios from "axios";

const useDeleteTodo = () => {
  const { setTodos, todos } = useTodos();
  const [isLoading, setIsLoading] = useState(false);

  const deleteTodo = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`/api/todos/${id}`);
      const newTodos = todos.filter((todo) => todo.id !== data.id);
      setTodos(newTodos);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTodo, isLoading };
};

export default useDeleteTodo;
