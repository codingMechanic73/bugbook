import { Post as PostType } from "@prisma/client";
import { prisma } from "~/database/db.server";
import { getPostDataInclude, getPostDataIncludeByUser } from "~/lib/types";

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
  return prisma.post.findMany({
    include: getPostDataInclude(),
    orderBy: { createdAt: "desc" },
    take: 10 + 1,
  });
};

export const getPostByUser = async (userId: string) => {
  return prisma.post.findMany({
    include: getPostDataIncludeByUser(userId),
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10 + 1,
  });
};

export const deletePost = async (id: string, userId: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) {
    throw new Error("Post not found");
  }

  if (post.userId !== userId) {
    throw new Error("Unauthorized Delete");
  }
  await prisma.post.delete({
    where: { id },
  });
};

export const getTrendingTopics = async () => {
  const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
              SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
              FROM posts
              GROUP BY (hashtag)
              ORDER BY count DESC, hashtag ASC
              LIMIT 5
          `;

  return result.map((row) => ({
    hashtag: row.hashtag,
    count: Number(row.count),
  }));
};
