import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/auth/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.logout(request, {
    redirectTo: "/signin",
  });
}

export async function loader() {
  throw redirect("/");
}
