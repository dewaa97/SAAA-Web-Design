import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "@/components/ui/button";

afterEach(() => {
  cleanup();
});

describe("Button", () => {
  it("renders white text on primary variant", () => {
    render(<Button className="btn btn-primary">Join SAAA</Button>);
    const button = screen.getByRole("button", { name: "Join SAAA" });
    expect(button.className).toMatch(/text-white/);
    expect(button.className).toMatch(/btn-primary/);
  });

  it("keeps legacy btn-primary class for static CSS hooks", () => {
    render(<Button className="btn btn-primary">Submit</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-primary");
  });
});
