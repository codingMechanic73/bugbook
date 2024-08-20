import { LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useFetcher, useLocation, useNavigation } from "@remix-run/react";
import { useOptionalUser } from "~/hooks/useOptionalUser";
import { LoadingButton } from "./custom-ui/loading-button";
import { LinkButton } from "./custom-ui/link-button";
import { cn } from "~/lib/utils";
import UserAvatar from "./UserAvatar";
import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";

export default function NavBar() {
  const user = useOptionalUser();

  const fetcher = useFetcher();
  const location = useLocation();
  const currentPath = location.pathname;

  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (navigation.state === "loading" || navigation.state === "submitting") {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 20 : 100));
      }, 150);
    } else if (navigation.state === "idle") {
      setProgress(0);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [navigation.state]);

  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex h-[3.5rem] max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          bugbook
        </Link>
        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn("flex-none rounded-full")}>
                  <UserAvatar avatarUrl={undefined} size={40} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuLabel>
                  <fetcher.Form
                    action={`/logout?redirectTo=${encodeURIComponent(currentPath)}`}
                    method="POST"
                  >
                    <LoadingButton
                      loading={fetcher.state === "submitting"}
                      type="submit"
                      className="w-full"
                    >
                      <LogOutIcon className="mr-2 size-4" />
                      Logout
                    </LoadingButton>
                  </fetcher.Form>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LinkButton
              to={`/signin?redirectTo=${encodeURIComponent(currentPath)}`}
              prefetch="intent"
            >
              Sign In
            </LinkButton>
          )}
        </div>
      </div>
      {navigation.state !== "idle" ? (
        <Progress value={progress} className="h-1" />
      ) : (
        <div className="h-1"></div>
      )}
    </header>
  );
}
