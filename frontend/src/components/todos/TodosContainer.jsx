import AddTodos from "./AddTodos";
import { CalendarCheck } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import useGetTodos from "../../hooks/useGetTodos";
import { useEffect } from "react";

const TodosContainer = () => {
  const { isLoading, getTodos } = useGetTodos();

  useEffect(() => {
    getTodos();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col flex-grow py-4">
      <NoChatSelected />
      <AddTodos />
    </div>
  );
};

export default TodosContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.name} ❄</p>
        <p>✨ Start your next big thing today! Add a new todo!</p>
        <CalendarCheck className="text-[100px] text-center" />
      </div>
    </div>
  );
};
