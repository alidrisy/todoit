import express from "express";
import TodoController from "../controllers/TodoController";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.get("/", protectRoute, TodoController.getTodos);
router.post("/", protectRoute, TodoController.createTodo);
router.put("/:id", protectRoute, TodoController.updateTodo);
router.delete("/:id", protectRoute, TodoController.deleteTodo);

export default router;
