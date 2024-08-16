import type { MetaFunction } from "@remix-run/node";
import { NavBar } from "~/components/nav";

export const meta: MetaFunction = () => {
  return [{ title: "bugbook" }, { name: "description", content: "bugbook!" }];
};

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
    </div>
  );
}
