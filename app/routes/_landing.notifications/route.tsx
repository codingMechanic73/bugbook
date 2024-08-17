import { LoaderFunctionArgs } from "@remix-run/node";
import { protectWithSignIn } from "~/auth/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const currentUrl = new URL(request.url);
  const currentPath = currentUrl.pathname;
  await protectWithSignIn(request, currentPath);
  return null;
}

export default function Notifications() {
  return (
    <main className="w-full min-w-0">
      <div className="w-full min-w-0 space-y-5">Notifications</div>
    </main>
  );
}
