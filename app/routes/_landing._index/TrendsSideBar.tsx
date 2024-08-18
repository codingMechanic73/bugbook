import TrendingTopics from "./TrendingTopics";
import WhoToFollow from "./WhoToFollow";

interface TrendsSideBarProps {
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
  trendingTopics: Promise<
    {
      hashtag: string;
      count: number;
    }[]
  >;
  userId?: string;
}

export default function TrendsSidebar({
  usersToFollow,
  trendingTopics,
  userId,
}: TrendsSideBarProps) {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      {userId ? (
        <WhoToFollow usersToFollow={usersToFollow} userId={userId} />
      ) : null}
      <TrendingTopics trendingTopics={trendingTopics} />
    </div>
  );
}
