import Conversations from "./Catagories";
import LogoutButton from "./LogoutButton";
import InfoButton from "./InfoButton";

const Sidebar = () => {
  return (
    <div
      className={`border-r border-slate-500 p-1 md:p-4 flex flex-col h-full w-fit-content min-w-fit`}
    >
      <div className="flex justify-between items-center px-1">
        <div className="flex justify-center items-center text-lg font-bold space-x-1">
          <img className="w-8 h-8" src="./todoit.png" alt="" />
          <h1>Todos</h1>
        </div>
        <InfoButton />
      </div>
      <div className="divider px-3" />
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
