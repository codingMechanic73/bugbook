import { Post as PostType } from "@prisma/client";
import { prisma } from "~/database/db.server";
import { postDataInclude } from "~/lib/types";

export type { PostType };

export const createPost = async (content: string, userId: string) => {
  await prisma.post.create({
    data: {
      content,
      userId,
    },
  });
};

export const getPost = async () => {
  return await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: "desc" },
  });
};
