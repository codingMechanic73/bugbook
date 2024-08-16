import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import loginImage from "~/assets/login-image.webp";

import { Label } from "~/components/ui/label";
import { validateEmail, validatePassword } from "~/utils/validations";
import { useEffect, useRef } from "react";
import {
  authenticateAndLogin,
  authenticateAndRedirect,
} from "~/auth/auth.server";
import { AuthorizationError } from "remix-auth";
import { safeRedirect } from "~/lib/requestUtils";

export const meta: MetaFunction = () => {
  return [{ title: "bugbook" }, { name: "description", content: "bugbook!" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const requestClone = request.clone();

  const form = await requestClone.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (!validateEmail(email)) {
    return json(
      {
        errors: {
          email: "Invalid email",
          password: null,
        },
      },
      { status: 400 },
    );
  }

  if (!validatePassword(password)) {
    return json(
      {
        errors: {
          email: null,
          password: "Password is required",
        },
      },
      { status: 400 },
    );
  }

  try {
    const redirectTo = safeRedirect(request);
    await authenticateAndLogin(request, redirectTo);
  } catch (error) {
    if (error instanceof Response) {
      return error;
    } else if (error instanceof AuthorizationError) {
      return json(
        {
          errors: {
            email: error.message,
            password: null,
          },
        },
        { status: 400 },
      );
    }
    return json(
      {
        errors: {
          email: "Something went wrong",
          password: null,
        },
      },
      { status: 500 },
    );
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const redirectTo = safeRedirect(request);
  authenticateAndRedirect(request, redirectTo);
  return null;
}

export default function Login() {
  const fetcher = useFetcher<typeof action>();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const emailError = fetcher.data?.errors?.email;
  const passwordError = fetcher.data?.errors?.password;

  useEffect(() => {
    if (emailError) {
      emailRef?.current?.focus();
    } else if (passwordError) {
      passwordRef?.current?.focus();
    }
  }, [emailError, passwordError]);

  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
        <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold bg-red text-primary">
              Sign In to bugbook
            </h1>
            <p className="text-muted-foreground">
              A place where even{" "}
              <span className="italic text-primary">you</span> can find friend.
            </p>
          </div>
          <div className="space-y-5">
            <fetcher.Form className="space-y-5" method="POST">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  ref={emailRef}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                />
                {emailError ? (
                  <div className="text-red-700 font-semibold">{emailError}</div>
                ) : null}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  ref={passwordRef}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                />
                {passwordError ? (
                  <div className="text-red-700 font-semibold">
                    {passwordError}
                  </div>
                ) : null}
              </div>
              <Button
                type="submit"
                className="w-full text-xl font-bold"
                disabled={fetcher.state === "submitting"}
              >
                Login
              </Button>
            </fetcher.Form>
            <Link
              to="/signup"
              prefetch="intent"
              className="block text-center hover:underline"
            >
              Create a new Account? Sign Up
            </Link>
          </div>
        </div>
        <img
          loading="lazy"
          src={loginImage}
          alt="Login"
          className="w-1/2 hidden md:block object-cover"
        />
      </div>
    </main>
  );
}
