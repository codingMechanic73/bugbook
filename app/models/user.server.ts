import { User } from "@prisma/client";
import { prisma } from "~/database/db.server";

export type AuthenticatedUserType = Omit<
  User,
  "hashedPassword" | "createdAt" | "updatedAt"
>;

export const createUser = async (
  name: User["name"],
  email: User["email"],
  password: string,
): Promise<User> => {
  return await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword: password,
    },
  });
};

export const getUserByEmail = async (email: User["email"]) => {
  return await prisma.user.findFirst({ where: { email } });
};
