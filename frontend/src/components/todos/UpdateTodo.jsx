/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { PencilLine } from "lucide-react";
import useUpdateTodo from "../../hooks/useUpdateTodo";

const UpdateTodo = ({ todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [openClosedForm, setOpenClosedForm] = useState(false);
  const { updateTodo, isLoading } = useUpdateTodo();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (title === todo.title && description === todo.description) {
      toast.error("No changes made");
      return;
    }

    updateTodo({ title, description }, todo.id);
    setOpenClosedForm(false);
  };

  const handleClosetForm = (e) => {
    e.preventDefault();
    setOpenClosedForm(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={() => setOpenClosedForm(true)}>
        {isLoading ? (
          <span className="loading loading-ring loading-sm" />
        ) : (
          <PencilLine className="hover:text-gray-600" />
        )}
      </button>

      <div className={`modal ${openClosedForm && "modal-open"} bg-transparent`}>
        <div className="modal-box w-full p-6 rounded-lg shadow-md bg-white">
          <h1 className="text-3xl font-semibold text-center text-black">
            Update<span className="text-blue-600"> Todo</span>
          </h1>
          <form>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-black">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="w-full input input-bordered h-10 text-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">
                  Description
                </span>
              </label>
              <textarea
                placeholder="Enter description"
                className="w-full input input-bordered h-10 text-black pt-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mt-4 flex flex-col justify-center items-center space-y-2">
              <button
                className="btn btn-sm bg-black text-white w-full"
                type="submit"
                onClick={handleSubmitForm}
              >
                Submit
              </button>
              <button
                className="btn btn-sm bg-black text-white w-full"
                onClick={handleClosetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
