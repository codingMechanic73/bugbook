import { User } from "@prisma/client";
import { useMatchesData } from "./useMatchesData";
import { AuthenticatedUserType } from "~/models/user.server";

function isUser(user: unknown): user is User {
  return (
    user != null &&
    typeof user === "object" &&
    "id" in user &&
    typeof user.id === "string" &&
    "name" in user &&
    typeof user.name === "string" &&
    "email" in user &&
    typeof user.email === "string"
  );
}

export function useOptionalUser(): AuthenticatedUserType | undefined {
  const data = useMatchesData("root");
  return isUser(data?.user) ? data.user : undefined;
}
