import { AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { getUserByEmail } from "~/models/user.server";

export const formStratergy = new FormStrategy(async ({ form }) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new AuthorizationError("Please create an account to login");
    } else if (user.hashedPassword !== password) {
      throw new AuthorizationError("Invalid credentials");
    }

    return user;
  } catch (error) {
    if (error instanceof AuthorizationError) {
      throw error;
    } else {
      console.error("Database error: ", error);
      throw new Error("Something went wrong.");
    }
  }
});
