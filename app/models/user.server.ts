import { AuthorizationError } from "remix-auth";

type UserType = {
  id: number;
  name: string;
  email: string;
  hashedPassword: string;
  createdAt: string;
  updatedAt: string;
};

type CreateUserType = Omit<UserType, "id" | "createdAt" | "updatedAt">;

export type AuthenticatedUserType = Omit<
  UserType,
  "hashedPassword" | "createdAt" | "updatedAt"
>;

const users: UserType[] = [];

export const createUser = async (
  name: UserType["name"],
  email: UserType["email"],
  password: string,
): Promise<AuthenticatedUserType> => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new AuthorizationError("User is already registered with this email");
  }

  const newUser: CreateUserType = {
    name,
    email,
    hashedPassword: password,
  };

  const createdUser: UserType = {
    ...newUser,
    id: users.length + 1,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  };

  users.push(createdUser);

  return {
    id: createdUser.id,
    name,
    email,
  };
};

export const getUserByEmail = async (
  email: UserType["email"],
): Promise<UserType | undefined> => {
  const user = users.find((user) => user.email === email);
  return user;
};
