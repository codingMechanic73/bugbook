import { useOptionalUser } from "~/hooks/useOptionalUser";
import PostEditor from "./postEditor";
import { createPost, getPost } from "~/models/post.server";
import { Await, useLoaderData } from "@remix-run/react";
import Post from "./post";
import { ActionFunctionArgs, defer, json } from "@remix-run/node";
import { Suspense } from "react";
import { getAuthenticatedUser } from "~/auth/auth.server";
import { validatePostContent } from "~/utils/validations";

export async function loader() {
  const posts = getPost();
  return defer({ posts });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return json({ errors: { message: "UnAuthorized User" } }, { status: 401 });
  }

  const formData = await request.formData();
  const content = formData.get("content");

  if (!validatePostContent(content)) {
    return json(
      { errors: { message: "Invalid Post Content" } },
      { status: 400 },
    );
  }

  await createPost(content, user.id);
  return null;
}

export default function Posts() {
  const user = useOptionalUser();
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main className="w-full min-w-0">
      <div className="w-full min-w-0 space-y-5">
        {user && <PostEditor />}
        <Suspense fallback={<div>Loading</div>}>
          <Await resolve={posts}>
            {(posts) =>
              posts?.map((post) => <Post key={post.id} post={post} />)
            }
          </Await>
        </Suspense>
      </div>
    </main>
  );
}
