import { fireEvent, render, screen } from "@testing-library/react";
import Select from "./Select";
import Button from "./Button";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

describe("<Select />", () => {
  test("Select 컴포넌트가 렌더링되는지 확인", () => {
    const { container } = render(<Select options={options} />);
    const selectComponent = screen.getByTestId("select-component");
    expect(selectComponent).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("input이 올바르게 렌더링되는지 확인", () => {
    render(<Select options={options} />);
    const inputElement = screen.getByPlaceholderText("Movie");
    expect(inputElement).toBeInTheDocument();
  });

  test("input 입력값에 따라 옵션 리스트가 필터링되는지 확인", () => {
    render(<Select options={options} />);
    const inputElement = screen.getByPlaceholderText("Movie");
    fireEvent.change(inputElement, { target: { value: "Option 1" } });
    const filteredOption = screen.getByText("Option 1");
    expect(filteredOption).toBeInTheDocument();
  });

  test("input change 이벤트가 올바르게 동작하는지 확인", () => {
    render(<Select options={options} />);
    const inputElement = screen.getByPlaceholderText(
      "Movie"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Lord" } });
    expect(inputElement.value).toBe("Lord");
  });

  test("클리어 버튼 클릭 시 input에 내용이 지워지는지 확인", () => {
    render(<Select options={options} />);
    const inputElement = screen.getByPlaceholderText(
      "Movie"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Lord" } });
    expect(inputElement.value).toBe("Lord");

    const onClickHandler = jest.fn();
    render(
      <Button dataTestId="" onClickHandler={onClickHandler}>
        Click Me
      </Button>
    );

    const clearBtn = screen.getByTestId("clear");
    // clear 버튼 클릭
    fireEvent.click(clearBtn);
    // 값이 비워졌는지 확인
    expect(inputElement.value).toBe("");
  });

  test("셀렉트 컴포넌트 토글버튼 클릭 이벤트가 잘 동작하는지 확인", () => {
    const handlerClick = jest.fn();
    const { getByTestId } = render(
      <Button dataTestId="toggle" onClickHandler={handlerClick}>
        toggle button
      </Button>
    );
    expect(handlerClick).toHaveBeenCalledTimes(0);
    const toggleBtn = getByTestId("toggle");
    fireEvent.click(toggleBtn);

    expect(handlerClick).toHaveBeenCalledTimes(1);
  });

  it("onKeyboardHandler 잘 동작하는지 확인", () => {
    const onKeyboardHandler = jest.fn();
    const { container } = render(<Select options={options} />);

    const divElement = container.querySelector(
      ".MuiAutocomplete-root"
    ) as HTMLDivElement;

    fireEvent.keyDown(divElement, { key: "Enter" });
    expect(onKeyboardHandler).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(divElement, { key: "ArrowUp" });
    expect(onKeyboardHandler).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(divElement, { key: "ArrowDown" });
    expect(onKeyboardHandler).toHaveBeenCalledTimes(0);
  });
});
