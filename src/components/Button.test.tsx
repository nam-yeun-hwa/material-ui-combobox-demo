// import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("children을 올바르게 렌더링 했는지 확인", () => {
    const { getByText } = render(
      <Button onClickHandler={() => {}}>Click Me</Button>
    );
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  it("버튼별 class가 잘 적용이 되었는지 확인", () => {
    const { getByRole } = render(
      <Button onClickHandler={() => {}} activeClass="active">
        Click Me
      </Button>
    );
    const button = getByRole("button");
    expect(button).toHaveClass("active");
  });

  it("클릭될 때 onClickHandler가 잘 호출되는지", () => {
    const onClickHandler = jest.fn();
    const { getByRole } = render(
      <Button onClickHandler={onClickHandler}>Click Me</Button>
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });

  it("기본 onMouseDown 이벤트가 작동하지 않는지 확인", () => {
    const { getByRole } = render(
      <Button onClickHandler={() => {}}>Click Me</Button>
    );
    const button = getByRole("button");
    fireEvent.mouseDown(button);
  });
});
