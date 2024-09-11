import useGetMessages from "../../hooks/useGetTodos";
import Message from "./Todo";

const Todos = () => {
  const { isLoading, messages } = useGetMessages();

  if (isLoading) {
    return (
      <div className="px-4 flex-1 flex items-center justify-center">
        <div className="lds-roller text-white">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.length === 0 && (
        <div className="h-full flex justify-center items-center">
          <p className="text-center text-white text-lg">
            Send a message to start a conversation with Admin
          </p>
        </div>
      )}
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
export default Todos;
