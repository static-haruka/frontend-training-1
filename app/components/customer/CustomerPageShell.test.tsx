import { render, screen } from "@testing-library/react";
import CustomerPageShell from "./CustomerPageShell";

jest.mock("./CustomerSidePanel", () => {
  return function MockCustomerSidePanel(props: any) {
    return (
      <div data-testid="side">
        side:{props.customer?.name ?? "no-name"}
      </div>
    );
  };
});

jest.mock("./TopTabs", () => {
  return function MockTopTabs(props: any) {
    return <div data-testid="tabs">active:{String(props.active)}</div>;
  };
});

describe("CustomerPageShell", () => {
  it("CustomerSidePanel に customer を渡し、TopTabs に active を渡し、children を描画する", () => {
    render(
      <CustomerPageShell
        customer={
          {
            name: "username",
          } as any
        }
        active={"purchase" as any}
      >
        <div>page-content</div>
      </CustomerPageShell>
    );

    expect(screen.getByTestId("side")).toHaveTextContent("side:username");
    expect(screen.getByTestId("tabs")).toHaveTextContent("active:purchase");
    expect(screen.getByText("page-content")).toBeInTheDocument();
  });
});