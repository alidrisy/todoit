import genrateToken from "../utiles/generateToken";
import prisma from "../db/prisma.js";
import hashPassword from "../utiles/hashPassword.js";
import bcrypt from "bcryptjs";

class UserController {
  static async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = hashPassword(password);
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      genrateToken(user.id, res);
      const { password: userPassword, ...rest } = user;
      res.json(rest);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      genrateToken(user.id, res);
      const { password: userPassword, ...rest } = user;
      res.json(rest);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getUserProfile(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password: userPassword, ...rest } = user;
      res.json(rest);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async logout(_req, res) {
    try {
      res.clearCookie("jwt");

      res.json({ message: "User logged out" });
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default UserController;
