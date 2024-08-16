import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoadingButton } from "~/components/custom-ui/loading-button";

describe("Button", () => {
  it("renders button correctly with given text", () => {
    render(<LoadingButton loading={false}>Click Me</LoadingButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("displays loading spinner and disables button when loading", () => {
    render(<LoadingButton loading={true}>Click Me</LoadingButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    const spinner = button.querySelector(".animate-spin");

    expect(button).toBeDisabled();
    expect(spinner).toBeInTheDocument();
  });

  it("does not show spinner and enables button when not loading", () => {
    render(<LoadingButton loading={false}>Click Me</LoadingButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    const spinner = button.querySelector(".animate-spin");

    expect(button).not.toBeDisabled();
    expect(spinner).not.toBeInTheDocument();
  });
});
