import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  let userId;
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    userId = decodedToken.id;
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      email: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ userEmail: user.email });
}
