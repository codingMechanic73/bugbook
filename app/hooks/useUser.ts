import { AuthenticatedUserType } from "~/models/user.server";
import { useOptionalUser } from "./useOptionalUser";

export function useUser(): AuthenticatedUserType {
  const user = useOptionalUser();
  if (!user) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return user;
}
