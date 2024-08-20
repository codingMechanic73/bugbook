import { useOptionalUser } from "~/hooks/useOptionalUser";
import PostEditor from "~/routes/_landing._index/PostEditor";
import { getPost, getTrendingTopics } from "~/models/post.server";
import { Await, useLoaderData } from "@remix-run/react";
import {
  ActionFunctionArgs,
  defer,
  json,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { Suspense } from "react";
import { getAuthenticatedUser } from "~/auth/auth.server";
import TrendsSidebar from "~/routes/_landing._index/TrendsSideBar";
import { getUsersToFollow } from "~/models/user.server";
import PostSkeleton from "~/components/post/PostSkeleton";
import {
  handleCreateAction,
  handleDeleteAction,
  handleFollowAction,
  handleUnfollowAction,
} from "./_postActions";
import Post from "~/components/post/Post";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getAuthenticatedUser(request);
  const posts = getPost();
  const usersToFollow = user?.id
    ? getUsersToFollow(user.id)
    : Promise.resolve([]);
  const trendingTopics = getTrendingTopics();
  return defer({ posts, usersToFollow, trendingTopics });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return json({ errors: { message: "UnAuthorized User" } }, { status: 401 });
  }

  const formData = await request.formData();
  const actionType = formData.get("actionType");

  switch (actionType) {
    case "createAction":
      return handleCreateAction(formData, user.id);
    case "deleteAction":
      return handleDeleteAction(formData, user.id);
    case "followAction":
      return handleFollowAction(formData, user.id);
    case "unfollowAction":
      return handleUnfollowAction(formData, user.id);
    default:
      throw new Error("Invalid action type");
  }
}

export default function Posts() {
  const user = useOptionalUser();
  const { posts, usersToFollow, trendingTopics } =
    useLoaderData<typeof loader>();
  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        {user && <PostEditor />}
        <Suspense
          fallback={Array.from({ length: 5 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        >
          <Await resolve={posts}>
            {(posts) =>
              posts?.map((post) => (
                <Post key={post.id} post={post} userId={user?.id} />
              ))
            }
          </Await>
        </Suspense>
      </div>
      <TrendsSidebar
        userId={user?.id}
        usersToFollow={usersToFollow}
        trendingTopics={trendingTopics}
      />
    </main>
  );
}
