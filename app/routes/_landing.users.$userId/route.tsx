import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { protectWithSignIn } from "~/auth/auth.server";
import UserProfile from "./UserProfile";
import { Await, useLoaderData } from "@remix-run/react";
import { getUser, getUserByUsername } from "~/models/user.server";
import { Suspense } from "react";
import Post from "~/components/post/Post";
import PostSkeleton from "~/components/post/PostSkeleton";
import { getPostByUser } from "~/models/post.server";
import { useUser } from "~/hooks/useUser";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const currentUrl = new URL(request.url);
  const currentPath = currentUrl.pathname;
  await protectWithSignIn(request, currentPath);

  const username = params.userId;

  if (!username) {
    throw new Error("User id is missing");
  }

  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("user not found");
  }

  const userData = await getUser(user.id);
  const posts = getPostByUser(user.id);
  return defer({ posts, userData });
}

export default function Users() {
  const { posts, userData } = useLoaderData<typeof loader>();
  const user = useUser();
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <Suspense
          fallback={Array.from({ length: 5 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        >
          <Await resolve={userData}>
            {(userData) =>
              userData ? (
                <UserProfile userData={userData} loggedInUserId={user.id} />
              ) : null
            }
          </Await>
        </Suspense>
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h2 className="text-center text-2xl font-bold">
            {user.name}&apos;s posts
          </h2>
        </div>
        <Suspense
          fallback={Array.from({ length: 5 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        >
          <Await resolve={posts}>
            {(posts) =>
              posts?.map((post) => (
                <Post key={post.id} post={post} userId={user.id} />
              ))
            }
          </Await>
        </Suspense>
      </div>
    </main>
  );
}
