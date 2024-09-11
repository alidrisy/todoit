/* eslint-disable react/prop-types */
import { Clock12, EllipsisVertical } from "lucide-react";

const Todo = ({ todo }) => {
  return (
    <div className="flex flex-col justify-between bg-gray-200 rounded-lg p-4  overflow-hidden w-full">
      <div className="flex items-center justify-between bg-gray-200 rounded-lg ">
        <div className="flex space-x-4 items-center">
          <input
            type="checkbox"
            className="checkbox border-green-600 checkbox-success"
          />
          <h1 className="text-xl font-semibold truncate">{todo.title}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-black/10 py-1 px-2 rounded-lg">
            <Clock12 size={20} />
            <p>{new Date(todo.createdAt).toLocaleDateString()}</p>
          </div>
          <EllipsisVertical />
        </div>
      </div>
      <p className="text-gray-600  max-w-full break-words break-all px-3 py-2 ">
        {todo.description}
      </p>
    </div>
  );
};

export default Todo;
