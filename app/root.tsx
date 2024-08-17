import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import PWABadge from "~/components/PWABadge";
import { PWAAssets } from "~/components/PWAAssets";
import { SpeedInsights } from "@vercel/speed-insights/remix";
import { Analytics } from "@vercel/analytics/react";
import "./tailwind.css";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getAuthenticatedUser } from "./auth/auth.server";
import { Button } from "./components/ui/button";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getAuthenticatedUser(request) });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PWAAssets />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <PWABadge />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const errorMessage = error instanceof Error ? error.message : "Unknown Error";
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3lg text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, Something Went Wrong!!
        </h1>
        <p className="mt-4 text-muted-foreground">{errorMessage}</p>
        <div className="mt-6">
          <Button asChild>
            <a href="/">Go to Homepage</a>
          </Button>
        </div>
      </div>
    </main>
  );
}
