import { Link } from "@remix-run/react";
import UserAvatar from "~/components/UserAvatar";
import PostMoreButton from "./PostMoreButton";
import { PostData } from "~/lib/types";
import Linkify from "~/components/Linkify";

interface PostProps {
  post: PostData;
  userId?: string;
}

export default function Post({ post, userId }: PostProps) {
  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link to={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={undefined} />
          </Link>
          <div>
            <Link
              to={`/users/${post.user.username}`}
              className="block font-medium hover:underline"
            >
              {post.user.name}
            </Link>
            <Link
              to={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
            ></Link>
          </div>
        </div>
        {post.user.id === userId && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
    </article>
  );
}
