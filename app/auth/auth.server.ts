import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { formStratergy } from "./strategies/formStrategy";
import { AuthenticatedUserType } from "~/models/user.server";
const authenticator = new Authenticator<AuthenticatedUserType>(sessionStorage, {
  throwOnError: true,
});
authenticator.use(formStratergy);

export async function authenticateAndLogin(
  request: Request,
  redirectTo: string,
) {
  return await authenticator.authenticate("form", request, {
    successRedirect: redirectTo,
    throwOnError: true,
  });
}

export async function authenticateAndRedirect(
  request: Request,
  redirectTo: string,
) {
  await authenticator.isAuthenticated(request, {
    successRedirect: redirectTo,
  });
  return;
}

export async function getAuthenticatedUser(request: Request) {
  return await authenticator.isAuthenticated(request);
}

export async function logoutAndRedirect(request: Request, redirectTo: string) {
  return authenticator.logout(request, {
    redirectTo,
  });
}

export async function protectWithSignIn(request: Request, redirectTo: string) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: `/signin?redirectTo=${redirectTo}`,
  });
}
