import { useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import useAddTodo from "../../hooks/useAddTodo";

const AddTodo = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });
  const [openClosedForm, setOpenClosedForm] = useState(false);
  const { addTodos, isLoading } = useAddTodo();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!inputs.title.trim()) {
      toast.error("Title is required");
      return;
    }
    const newTodo = {
      ...inputs,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addTodos(newTodo);
    setInputs({ title: "", description: "" });
    setOpenClosedForm(false);
  };

  const handleClosetForm = (e) => {
    e.preventDefault();
    setInputs({ title: "", description: "" });
    setOpenClosedForm(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <button
        className="rounded-full bg-black px-3 py-1.5 flex space-x-2 justify-center items-center"
        onClick={() => setOpenClosedForm(true)}
      >
        {isLoading ? (
          <span className="loading loading-ring loading-sm" />
        ) : (
          <Plus
            className={`text-white text-sm transform transition-transform duration-300 ease-in-out ${
              openClosedForm ? "rotate-45" : "rotate-0"
            }`}
          />
        )}
        <p className="text-white font-medium text-xs pr-2">Create a new Todo</p>
      </button>

      <div className={`modal ${openClosedForm && "modal-open"} bg-transparent`}>
        <div className="modal-box w-full p-6 rounded-lg shadow-md bg-white">
          <h1 className="text-3xl font-semibold text-center text-black">
            Add a<span className="text-blue-600"> New Todo</span>
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
                value={inputs.title}
                onChange={(e) =>
                  setInputs({ ...inputs, title: e.target.value })
                }
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
                value={inputs.description}
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.target.value })
                }
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

export default AddTodo;
