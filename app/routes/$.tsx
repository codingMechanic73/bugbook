import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { LinkButton } from "~/components/custom-ui/link-button";

export const loader = () => {
  throw new Response("Not Found", { status: 404 });
};

export default () => null;

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Oops, page not found!
          </h1>
          <p className="mt-4 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t seem to exist.
            Let&apos;s get you back on track.
          </p>
          <div className="mt-6">
            <LinkButton to="/" prefetch={"viewport"}>
              Go to Homepage
            </LinkButton>
          </div>
        </div>
      </main>
    );
  }
}
