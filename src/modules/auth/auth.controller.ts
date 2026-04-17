import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.ts";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check password FIRST
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT including the role
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "very_secret_key",
      { expiresIn: "2h" },
    );

    // Send final response ONCE
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Register
const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    // Generate JWT for the new user
    const token = jwt.sign(
      { id: newUser.id, email: newUser?.email, role: newUser?.role },
      process.env.JWT_SECRET || "very_secret_key",
      { expiresIn: "2h" },
    );
    res.status(201).json({
      success: true,
      message: "register is successfully",
      token,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser?.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

// get user profile
const userProfile = async (req: Request, res: Response) => {
  // Use email from the decoded token (attached by middleware)
  const email = (req as any).user.email;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
};


export const authController = { login, register, userProfile };
