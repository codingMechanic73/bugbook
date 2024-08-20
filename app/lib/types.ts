import { Prisma } from "@prisma/client";

export function getUserDataForPostSelect() {
  return {
    id: true,
    username: true,
    name: true,
    avatarUrl: true,
  };
}

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    name: true,
    avatarUrl: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export function getPostDataInclude() {
  return {
    user: {
      select: getUserDataForPostSelect(),
    },
  } satisfies Prisma.PostInclude;
}

export function getPostDataIncludeByUser(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
  } satisfies Prisma.PostInclude;
}

export type PostData = Omit<
  Prisma.PostGetPayload<{
    include: ReturnType<typeof getPostDataInclude>;
  }>,
  "createdAt" | "updatedAt"
>;

export type UserToFollowData = Omit<
  Prisma.UserGetPayload<{ include: ReturnType<typeof getUserDataSelect> }>,
  "createdAt" | "updatedAt" | "hashedPassword" | "email"
>;

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}
