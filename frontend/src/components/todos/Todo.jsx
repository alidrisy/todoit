/* eslint-disable react/prop-types */
import { Clock12 } from "lucide-react";
import UpdateTodo from "./UpdateTodo";
import useUpdateTodo from "../../hooks/useUpdateTodo";
import { extractTime } from "../../utils/extractTime";
import DeleteTodo from "./DeleteTodo";

const Todo = ({ todo }) => {
  const { updateTodo, isLoading } = useUpdateTodo();

  return (
    <div className="bg-gray-200 rounded-lg p-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isLoading ? (
            <span className="loading loading-ring loading-sm" />
          ) : (
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              onChange={() =>
                updateTodo({ completed: !todo.completed }, todo.id)
              }
              checked={todo.completed}
            />
          )}
          <h1 className="text-xl font-semibold truncate max-w-[200px]">
            {todo.title.legnth > 30
              ? `${todo.title.slice(0, 30)}...`
              : todo.title}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <Clock12 size={16} />
            <span className="text-sm">{extractTime(todo?.createdAt || todo.created_at)}</span>
          </div>
          <UpdateTodo todo={todo} />
          <DeleteTodo todo={todo} />
        </div>
      </div>
      {todo.description && (
        <p className="text-gray-600 break-words mt-2">{todo.description}</p>
      )}
    </div>
  );
};

export default Todo;
