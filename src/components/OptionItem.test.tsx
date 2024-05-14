import { render } from "@testing-library/react";
import OptionItem from "./OptionItem";
import { createRoot } from "react-dom/client";
import { selectOptionType } from "type/data";

describe("OptionItem Component", () => {
  const options: selectOptionType = [
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
