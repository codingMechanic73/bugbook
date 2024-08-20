import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "~/components/ui/dialog";
import { useFetcher } from "@remix-run/react";
import { LoadingButton } from "~/components/custom-ui/loading-button";
import { Button } from "~/components/ui/button";

import { PostData } from "~/lib/types";

interface DeletePostDialogProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
}

export default function PostDeleteDialog({
  post,
  open,
  onClose,
}: DeletePostDialogProps) {
  const fetcher = useFetcher();

  function handleOpenChange(open: boolean) {
    if (!open || fetcher.state !== "submitting") {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete post?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <fetcher.Form method="POST">
            <input type="hidden" name="postId" value={post.id} />
            <LoadingButton
              name="actionType"
              value={"deleteAction"}
              variant="destructive"
              loading={fetcher.state === "submitting"}
            >
              Delete
            </LoadingButton>
          </fetcher.Form>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={fetcher.state === "submitting"}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
