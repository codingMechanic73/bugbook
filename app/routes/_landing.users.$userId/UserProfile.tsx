import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import UserAvatar from "~/components/UserAvatar";
import { UserToFollowData } from "~/lib/types";

interface UserProfileProps {
  userData: UserToFollowData;
  loggedInUserId: string;
}

export default function UserProfile({
  userData,
  loggedInUserId,
}: UserProfileProps) {
  const fetcher = useFetcher();

  const isFollowing = userData.followers.find(
    (user) => user.followerId === loggedInUserId,
  );

  return (
    <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <UserAvatar
        avatarUrl={userData.avatarUrl}
        size={250}
        className="mx-auto size-full max-h-60 max-w-60 rounded-full"
      />
      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <div className="me-auto space-y-3">
          <div>
            <h1 className="text-3xl font-bold">{userData.name}</h1>
            <div className="text-muted-foreground">@{userData.username}</div>
          </div>
          {/* <div>Member since {formatDate(userData.createdAt, "MMM d, yyyy")}</div> */}
          <div className="flex items-center gap-3">
            <span>
              Followers:{" "}
              <span className="font-semibold">{userData._count.followers}</span>
            </span>
            {/* <FollowerCount userId={userData.id} initialState={followerInfo} /> */}
          </div>
        </div>
        {
          userData.id === loggedInUserId ? (
            <Button disabled={true}>Edit profile</Button>
          ) : (
            <fetcher.Form method="POST">
              <input
                type="hidden"
                name="followId"
                value={
                  userData.followers.find(
                    (user) => user.followerId == userData.id,
                  )?.followerId
                }
              />
              <Button
                name="actionType"
                value={isFollowing ? "unfollowAction" : "followAction"}
                disabled={true}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </fetcher.Form>
          )
          // <FollowButton userId={userData.id} initialState={followerInfo} />
        }
      </div>
      {/* {userData.bio && (
        <>
          <hr />
          <div className="overflow-hidden whitespace-pre-line break-words">
            {userData.bio}
          </div>
        </>
      )} */}
    </div>
  );
}
