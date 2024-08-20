import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import UserAvatar from "~/components/UserAvatar";
import { Textarea } from "~/components/ui/textarea";
import { useOptionalUser } from "~/hooks/useOptionalUser";
import { action } from "../logout";

const PostEditor = () => {
  const user = useOptionalUser();
  const fetcher = useFetcher<typeof action>();

  return (
    <fetcher.Form
      method="POST"
      className="flex flex-col gap-5 rounded-md bg-card p-5 shadow-sm"
    >
      <div className="flex gap-5">
        <UserAvatar className="hidden sm:inline" avatarUrl={user?.avatarUrl} />
        <Textarea
          placeholder="What's in your mind?"
          disabled={fetcher.state === "submitting"}
          name="content"
        />
      </div>
      <div className="flex justify-end">
        <Button
          name="actionType"
          value={"createAction"}
          type="submit"
          disabled={fetcher.state === "submitting"}
          className="min-w-20"
        >
          Post
        </Button>
      </div>
    </fetcher.Form>
  );
};

export { PostEditor };
