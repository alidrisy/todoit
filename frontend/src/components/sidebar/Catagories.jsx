import Catagorie from "./Catagorie";

const catagories = [
  {
    id: 0,
    name: "Home",
    filter: {},
    icon: "./house.png",
  },
  {
    id: 1,
    name: "Completed",
    filter: { completed: true },
    icon: "./list.png",
  },
  {
    id: 2,
    name: "Uncompleted",
    filter: { completed: false },
    icon: "./cancel-order.png",
  },
];

const Catagories = () => {
  return (
    <div className="max-md:hidden py-2 flex flex-col">
      {catagories.map((catagorie) => (
        <Catagorie key={catagorie.id} catagorie={catagorie} />
      ))}
    </div>
  );
};
export default Catagories;
