import { Prisma } from "@prisma/client";

export const postDataInclude = {
  user: {
    select: {
      username: true,
      name: true,
    },
  },
} satisfies Prisma.PostInclude;

export type PostDataType = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;
