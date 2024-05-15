import { fireEvent, render } from "@testing-library/react";
import OptionItem from "./OptionItem";

describe("OptionItem Component", () => {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  test("OptionItem이 올바르게 렌더링되는지 확인", () => {
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

  test("옵션이 클릭되면 onClickOptionItem이 호출되는지 확인", () => {
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
    // 옵션이 클릭되고 css가 잘 적용이 되는지 확인 하는 코드
  });

  test("마우스오버 이벤트시 onMouseOverHandler가 호출되는지 확인", () => {
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
    // 옵션이 클릭되고 css가 잘 적용이 되는지 확인 하는 코드
  });
});
