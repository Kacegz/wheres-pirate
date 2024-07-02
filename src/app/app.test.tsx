import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App component", () => {
  it("Should render properly", async () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
  it("Should show image", async () => {
    const user = userEvent.setup();

    render(<App />);
    const button = screen.getByRole("button", { name: "Start the game" });
    await user.click(button);
    const image = screen.getByAltText("img");
    expect(image)?.toBeInTheDocument();
  });
  it("Should render dropdown", async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole("button", { name: "Start the game" });
    await user.click(button);
    const image = screen.getByAltText("img");
    await user.click(image);
    const dropdown = screen.getByText("Parrot");
    expect(dropdown).toBeInTheDocument();
  });
});
