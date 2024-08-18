import { Await, Link, useFetcher } from "@remix-run/react";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import UserAvatar from "~/components/UserAvatar";

const WhoToFollowSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <UserAvatar avatarUrl={undefined} className="flex-none" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-24"></Skeleton>
          <Skeleton className="h-4 w-32"></Skeleton>
        </div>
      </div>
      <Button disabled>Follow</Button>
    </div>
  );
};

interface WhoToFollowProps {
  usersToFollow: Promise<
    {
      id: string;
      name: string;
      username: string;
      avatarUrl: string | null;
      followers: {
        followerId: string;
      }[];
      _count: {
        followers: number;
      };
    }[]
  >;
  userId?: string;
}

const FollowButton = ({
  isFollowing,
  userId,
  followId,
}: {
  isFollowing: boolean;
  userId?: string;
  followId: string;
}) => {
  const fetcher = useFetcher();
  isFollowing =
    fetcher.formData?.get("actionType") === "followAction" ? true : isFollowing;
  return (
    <fetcher.Form method="POST">
      <input type="hidden" name="followId" value={followId} />
      <Button
        name="actionType"
        value={isFollowing ? "unfollowAction" : "followAction"}
        disabled={!userId}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </fetcher.Form>
  );
};

export default function WhoToFollow({
  usersToFollow,
  userId,
}: WhoToFollowProps) {
  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Who to follow</div>
      <Suspense
        fallback={Array.from({ length: 2 })
          .fill(1)
          .map((_, index) => (
            <WhoToFollowSkeleton key={index} />
          ))}
      >
        <Await resolve={usersToFollow}>
          {(usersToFollow) =>
            usersToFollow.map((user) => {
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between gap-3"
                >
                  <Link
                    to={`/users/${user.username}`}
                    className="flex items-center gap-3"
                  >
                    <UserAvatar
                      avatarUrl={user.avatarUrl}
                      className="flex-none"
                    />
                    <div>
                      <p className="line-clamp-1 break-all font-semibold hover:underline">
                        {user.name}
                      </p>
                      <p className="line-clamp-1 break-all text-muted-foreground">
                        @{user.username}
                      </p>
                    </div>
                  </Link>
                  <FollowButton
                    isFollowing={user.followers.some(
                      ({ followerId }) => followerId === userId,
                    )}
                    userId={userId}
                    followId={user.id}
                  />
                </div>
              );
            })
          }
        </Await>
      </Suspense>
    </div>
  );
}
