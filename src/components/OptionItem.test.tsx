import { render } from "@testing-library/react";
import OptionItem from "./OptionItem";

describe("OptionItem Component", () => {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  test("renders option items correctly", () => {
    const { getByText } = render(
      <OptionItem
        options={options}
        onClickOptionItem={() => {}}
        onMouseOverHandler={() => {}}
      />
    );
    options.forEach((option) => {
      const optionElement = getByText(`${option.label}`);
      expect(optionElement).toBeInTheDocument();
    });
  });
});
