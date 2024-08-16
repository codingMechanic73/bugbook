import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import PWABadge from "~/components/PWABadge";
import { PWAAssets } from "~/components/PWAAssets";
import { SpeedInsights } from "@vercel/speed-insights/remix";
import { Analytics } from "@vercel/analytics/react";
import "./tailwind.css";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getAuthenticatedUser } from "./auth/auth.server";

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
