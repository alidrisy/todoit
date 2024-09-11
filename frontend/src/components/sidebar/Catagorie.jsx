/* eslint-disable react/prop-types */
import useTodos from "../../zustand/useTodos";

const Catagorie = ({ catagorie }) => {
  const { setSelectedCatagory, selectedCatagory, todos } = useTodos();

  const isSelected = selectedCatagory?.id === catagorie.id;

  return (
    <>
      <div
        className={`flex gap-4 items-center hover:bg-sky-500 rounded p-2 py-1.5 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedCatagory(catagorie)}
      >
        <img src={catagorie.icon} className="h-7 w-7" alt="" />
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 text-sm md:text-md">
              {catagorie?.name}
            </p>
          </div>
        </div>
        <div className="max-sm:hidden w-6 h-6 flex justify-center items-center bg-black/10 rounded-full">
          <p className="font-bold text-sm text-gray-200 pb-[2px]">
            {
              todos.filter(
                (todo) => todo.completed === catagorie?.filter?.completed
              ).length
            }
          </p>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};
export default Catagorie;
