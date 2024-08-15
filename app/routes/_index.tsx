import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [{ title: "bugbook" }, { name: "description", content: "bugbook!" }];
};

export default function Index() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <Button>Hello Remix + Shadcn</Button>
    </main>
  );
}
