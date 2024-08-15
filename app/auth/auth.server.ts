import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { formStratergy } from "./strategies/formStrategy";
import { AuthenticatedUserType } from "~/models/user.server";

export const authenticator = new Authenticator<AuthenticatedUserType>(
  sessionStorage,
  { throwOnError: true },
);
authenticator.use(formStratergy);
