export const DEFAULT_REDIRECT = "/";

export function safeRedirect(request: Readonly<Request>) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");

  if (
    !redirectTo ||
    typeof redirectTo !== "string" ||
    !redirectTo.startsWith("/") ||
    redirectTo.startsWith("//")
  ) {
    return DEFAULT_REDIRECT;
  }

  return redirectTo;
}
