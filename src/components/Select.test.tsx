import { fireEvent, render, screen } from "@testing-library/react";
import Select from "./Select";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

describe("<Select />", () => {
  test("Select 컴포넌트가 렌더링되는지 확인", () => {
    render(<Select options={options} />);
    const selectComponent = screen.getByTestId("select-component");
    expect(selectComponent).toBeInTheDocument();
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
});
