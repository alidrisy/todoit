import Sidebar from "../components/sidebar/Sidebar";
import TodosContainer from "../components/todos/TodosContainer";

const Home = () => {
  return (
    <div className="max-md:flex-col flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
      <Sidebar />
      <div className="max-md:flex-1 flex w-full max-md:overflow-y-auto">
        <TodosContainer />
      </div>
    </div>
  );
};

export default Home;
