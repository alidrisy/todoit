/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import useDeleteTodo from "../../hooks/useDeleteTodo";

const DeleteTodo = ({ todo }) => {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const { deleteTodo, isLoading } = useDeleteTodo();

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todo.id);
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
    setOpenDeleteConfirm(false);
  };

  const handleCloseForm = () => {
    setOpenDeleteConfirm(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={() => setOpenDeleteConfirm(true)}>
        {isLoading ? (
          <span className="loading loading-ring loading-sm" />
        ) : (
          <Trash2 className="hover:text-red-600" />
        )}
      </button>

      <div
        className={`modal ${openDeleteConfirm && "modal-open"} bg-transparent`}
      >
        <div className="modal-box w-full p-6 rounded-lg shadow-md bg-white">
          <h1 className="text-2xl font-semibold text-center text-black">
            Delete<span className="text-red-600"> Todo</span>
          </h1>
          <p className="text-center text-gray-600">
            Are you sure you want to delete this todo?
          </p>
          <div className="mt-4 flex flex-col justify-center items-center space-y-2">
            <button
              className="btn btn-sm bg-red-600 text-white w-full"
              onClick={handleDeleteTodo}
            >
              Delete
            </button>
            <button
              className="btn btn-sm bg-gray-400 text-white w-full"
              onClick={handleCloseForm}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTodo;
