import express from "express";
import UserController from "../controllers/UserController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, UserController.getUserProfile);
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/logout", protectRoute, UserController.logout);

export default router;
