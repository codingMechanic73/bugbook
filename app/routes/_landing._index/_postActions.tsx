import { json } from "@remix-run/node";
import { createPost, deletePost } from "~/models/post.server";
import { followUser, unFollowUser } from "~/models/user.server";
import { validatePostContent, validStringId } from "~/utils/validations";

export async function handleCreateAction(formData: FormData, userId: string) {
  const content = formData.get("content");

  if (!validatePostContent(content)) {
    return json(
      { errors: { message: "Invalid Post Content" } },
      { status: 400 },
    );
  }

  await createPost(content, userId);

  return json(
    { success: true, message: "Post Created Successfully" },
    { status: 201 },
  );
}

export async function handleDeleteAction(formData: FormData, userId: string) {
  const postId = formData.get("postId");

  if (!validStringId(postId)) {
    return json(
      { success: false, errors: { message: "Invalid Post Id" } },
      { status: 400 },
    );
  }

  try {
    await deletePost(postId, userId);
  } catch (error) {
    if (error instanceof Error) {
      return json(
        { success: false, errors: { message: error.message } },
        { status: 400 },
      );
    } else {
      console.error("Something Went Wrong", error);
      return json(
        { success: false, errors: { message: "Something Went Wrong" } },
        { status: 500 },
      );
    }
  }
  return json(
    { success: true, message: "Post Deleted Successfully" },
    { status: 200 },
  );
}

export async function handleFollowAction(formData: FormData, userId: string) {
  const userIdToFollow = formData.get("followId");

  if (!validStringId(userIdToFollow)) {
    return json(
      { success: false, errors: { message: "Invalid Id" } },
      { status: 400 },
    );
  }

  try {
    await followUser(userId, userIdToFollow);
  } catch (error) {
    if (error instanceof Error) {
      return json(
        { success: false, errors: { message: error.message } },
        { status: 400 },
      );
    } else {
      console.error("Something Went Wrong", error);
      return json(
        { success: false, errors: { message: "Something Went Wrong" } },
        { status: 500 },
      );
    }
  }
  return json(
    { success: true, message: "User Followed Successfully" },
    { status: 200 },
  );
}

export async function handleUnfollowAction(formData: FormData, userId: string) {
  const userIdToUnfollow = formData.get("followId");

  if (!validStringId(userIdToUnfollow)) {
    return json(
      { success: false, errors: { message: "Invalid Id" } },
      { status: 400 },
    );
  }

  try {
    await unFollowUser(userId, userIdToUnfollow);
  } catch (error) {
    if (error instanceof Error) {
      return json(
        { success: false, errors: { message: error.message } },
        { status: 400 },
      );
    } else {
      console.error("Something Went Wrong", error);
      return json(
        { success: false, errors: { message: "Something Went Wrong" } },
        { status: 500 },
      );
    }
  }
  return json(
    { success: true, message: "User UnFollowed Successfully" },
    { status: 200 },
  );
}
