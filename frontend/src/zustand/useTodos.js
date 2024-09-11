import { create } from "zustand";

const useTodos = create((set) => ({
  selectedCatagory: {
    id: 0,
    name: "All",
    filter: {},
  },
  setSelectedCatagory: (catagory) => set({ selectedCatagory: catagory }),
  todos: [],
  setTodos: (todos) => set({ todos: todos }),
}));

export default useTodos;
