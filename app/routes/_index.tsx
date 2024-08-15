import type { MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [{ title: "bugbook" }, { name: "description", content: "bugbook!" }];
};

export default function Index() {
  return (
    <main className="flex flex-col gap-5 h-screen items-center justify-center p-5">
      <Link to={"/signin"} prefetch="intent">
        <Button>Sign In to bugbook</Button>
      </Link>

      <Form action="/logout" method="POST">
        <Button type="submit">Logout</Button>
      </Form>
    </main>
  );
}
