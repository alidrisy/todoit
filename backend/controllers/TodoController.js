import prisma from "../db/prisma";

class TodoController {
  static async createTodo(req, res) {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const todo = await prisma.todo.create({
        data: {
          title,
          description,
          user: {
            connect: {
              id: req.user.id,
            },
          },
        },
      });
      res.json(todo);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getTodos(req, res) {
    try {
      console.log(req.query);
      const filter = {
        userId: req.user.id,
        ...req.query,
      };

      if (filter.completed) {
        filter.completed = filter.completed === "true";
      }

      const todos = await prisma.todo.findMany({
        where: filter,
      });
      res.json(todos);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateTodo(req, res) {
    try {
      const id = req.params.id;

      if ("userId" in req.body) {
        return res.status(400).json({ error: "You cannot update the user id" });
      }

      if ("id" in req.body) {
        return res.status(400).json({ error: "You cannot update the todo id" });
      }

      const todo = await prisma.todo.update({
        where: {
          id,
        },
        data: req.body,
      });
      res.json(todo);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteTodo(req, res) {
    try {
      const id = req.params.id;
      let todo = await prisma.todo.findUnique({
        where: {
          id,
        },
      });
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      todo = await prisma.todo.delete({
        where: {
          id,
        },
      });
      res.json(todo);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default TodoController;
