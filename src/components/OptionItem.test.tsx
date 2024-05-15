import { fireEvent, render } from "@testing-library/react";
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

  test("calls onClickOptionItem when an option is clicked", () => {
    const onClickOptionItem = jest.fn();

    const { getByText } = render(
      <OptionItem
        options={options}
        onClickOptionItem={onClickOptionItem}
        onMouseOverHandler={() => {}}
      />
    );

    const option = options[0];
    const optionElement = getByText(`${option.label}`);
    fireEvent.click(optionElement);

    expect(onClickOptionItem).toHaveBeenCalledWith(option);
  });

  test("calls onMouseOverHandler when mouse is over an option", () => {
    const onMouseOverHandler = jest.fn();

    const { getByText } = render(
      <OptionItem
        options={options}
        onClickOptionItem={() => {}}
        onMouseOverHandler={onMouseOverHandler}
      />
    );

    const option = options[0];
    const optionElement = getByText(`${option.label}`);
    fireEvent.mouseOver(optionElement);

    expect(onMouseOverHandler).toHaveBeenCalledWith(option);
  });
});
