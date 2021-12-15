import { render, screen } from "@testing-library/react";
import UserTable from "./components/UserTable";

// Basic unit test for Table component, has small data set, checks that table is rendered with the elements
const data = [
  {
    id: 0,
    birthday: 12,
    spend: 3223,
    region: "APAC",
    gender: "Male",
  },
  {
    id: 1,
    birthday: 12,
    spend: 2719,
    region: "Latin America",
    gender: "Male",
  },
  {
    id: 2,
    birthday: 5,
    spend: 4865,
    region: "Latin America",
    gender: "Male",
  },
];

it("Renders the table", () => {
  const div = document.createElement("div");
  render(<UserTable userData={data} />, div);
  expect(screen.getByText("2719")).toBeInTheDocument();
  expect(screen.getByText("3223")).toBeInTheDocument();
  expect(screen.getByText("APAC")).toBeInTheDocument();

  const Female = screen.queryByText("Female");
  expect(Female).toBeNull(); // it doesn't exist
});
