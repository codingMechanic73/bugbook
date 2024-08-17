import { Link } from "@remix-run/react";
import UserAvatar from "~/components/UserAvatar";
import { PostDataType } from "~/lib/types";

interface PostProps {
  post: PostDataType;
}

export default function Post({ post }: PostProps) {
  return (
    <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
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
      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
}
