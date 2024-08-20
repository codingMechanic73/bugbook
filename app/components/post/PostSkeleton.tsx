import { getRandomNumber } from "~/lib/mathUtils";
import { Skeleton } from "../ui/skeleton";
import UserAvatar from "../UserAvatar";

export default function PostSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <UserAvatar avatarUrl={undefined} />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-[250px]"></Skeleton>
          {Array.from({ length: getRandomNumber(1, 7) })
            .fill(1)
            .map((_, index) => (
              <Skeleton key={index} className="h-4 w-full"></Skeleton>
            ))}
        </div>
      </div>
    </div>
  );
}
