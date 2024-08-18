import { User } from "@prisma/client";
import { prisma } from "~/database/db.server";
import { randomUUID } from "crypto";
import { getUserDataSelect } from "~/lib/types";

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
      username: `${name.replace(/\s/g, "_").toLowerCase()}${randomUUID()}`,
      email,
      hashedPassword: password,
    },
  });
};

export const getUserByEmail = async (email: User["email"]) => {
  return await prisma.user.findFirst({ where: { email } });
};

export const getUsersToFollow = async (userId: string) => {
  return prisma.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
      // followers: {
      //   none: {
      //     followerId: userId,
      //   },
      // },
    },
    select: getUserDataSelect(userId),
    take: 5,
  });
};

export const followUser = async (userId: string, userIdToFollow: string) => {
  return await prisma.follow.upsert({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: userIdToFollow,
      },
    },
    create: {
      followerId: userId,
      followingId: userIdToFollow,
    },
    update: {},
  });
};

export const unFollowUser = async (
  userId: string,
  userIdToUnfollow: string,
) => {
  return await prisma.follow.deleteMany({
    where: {
      followerId: userId,
      followingId: userIdToUnfollow,
    },
  });
};
