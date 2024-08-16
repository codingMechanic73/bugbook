import { describe, expect, test } from "vitest";
import { DEFAULT_REDIRECT, safeRedirect } from "~/lib/requestUtils";

describe("Should safely redirect", () => {
  test("should return DEFAULT_REDIRECT for invalid values", () => {
    const request = new Request("http://example.com");
    expect(safeRedirect(request)).toBe(DEFAULT_REDIRECT);
    expect(
      safeRedirect({ ...request, url: "http://example.com?redirectTo=" }),
    ).toBe(DEFAULT_REDIRECT);
    expect(
      safeRedirect({ ...request, url: "http://example.com?redirectTo=//path" }),
    ).toBe(DEFAULT_REDIRECT);
    expect(
      safeRedirect({ ...request, url: "http://example.com?redirectTo=path" }),
    ).toBe(DEFAULT_REDIRECT);
    expect(
      safeRedirect({
        ...request,
        url: "http://example.com?redirectTo=http://wrongsite.example.com",
      }),
    ).toBe(DEFAULT_REDIRECT);
  });

  test('should return the valid "to" path', () => {
    const request = new Request("http://example.com");
    expect(
      safeRedirect({ ...request, url: "http://example.com?redirectTo=/path" }),
    ).toBe("/path");
    expect(
      safeRedirect({
        ...request,
        url: "http://example.com?redirectTo=/path/to/file",
      }),
    ).toBe("/path/to/file");
  });
});
