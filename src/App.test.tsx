import { render } from "@testing-library/react";
import Select from "./components/Select";

describe("MyComponent", () => {
  it("renders option items correctly", () => {
    const mockData = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ];

    const { getByText } = render(<Select options={mockData} />);

    mockData.forEach((option) => {
      const optionElement = getByText(`${option.label}`);
      expect(getByText(option.label)).toBeInTheDocument();
      expect(optionElement).toBeInTheDocument();
    });
  });
});
