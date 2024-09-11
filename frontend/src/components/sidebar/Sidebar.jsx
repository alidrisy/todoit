import Conversations from "./Catagories";
import LogoutButton from "./LogoutButton";
import InfoButton from "./InfoButton";

const Sidebar = () => {
  return (
    <div
      className={`border-r border-slate-500 p-1 md:p-4 flex flex-col h-full w-fit-content min-w-fit`}
    >
      <div className="flex justify-between items-center">
        <img className="w-8 h-8" src="./todoit.png" alt="" />
        <InfoButton />
      </div>
      <div className="divider px-3" />
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;