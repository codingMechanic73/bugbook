import { Await, Link } from "@remix-run/react";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";

const TrendingTopSkeleton = () => {
  return (
    <div className="space-y-1">
      <Skeleton className="h-4 w-full"></Skeleton>
      <Skeleton className="h-4 max-w-full w-24"></Skeleton>
    </div>
  );
};

interface TrendingTopicsProps {
  trendingTopics: Promise<
    {
      hashtag: string;
      count: number;
    }[]
  >;
}

export default function TrendingTopics({
  trendingTopics,
}: TrendingTopicsProps) {
  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Trending topics</div>
      <Suspense
        fallback={Array.from({ length: 2 })
          .fill(1)
          .map((_, index) => (
            <TrendingTopSkeleton key={index} />
          ))}
      >
        <Await resolve={trendingTopics}>
          {(trendingTopics) =>
            trendingTopics.map(({ hashtag, count }) => {
              const title = hashtag.split("#")[1];

              return (
                <Link key={title} to={`/hashtag/${title}`} className="block">
                  <p
                    className="line-clamp-1 break-all font-semibold hover:underline"
                    title={hashtag}
                  >
                    {hashtag}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {count} {count === 1 ? "post" : "posts"}
                  </p>
                </Link>
              );
            })
          }
        </Await>
      </Suspense>
    </div>
  );
}
