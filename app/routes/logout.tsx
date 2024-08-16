import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { logoutAndRedirect } from "~/auth/auth.server";
import { safeRedirect } from "~/lib/requestUtils";

export async function action({ request }: ActionFunctionArgs) {
  const redirectTo = safeRedirect(request);
  await logoutAndRedirect(request, redirectTo);
  return;
}

export async function loader() {
  throw redirect("/");
}
