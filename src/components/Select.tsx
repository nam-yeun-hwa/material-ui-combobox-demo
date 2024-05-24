import { ReactNode, useEffect, useRef, useState } from "react";
import "./select.css";
import Button from "./Button.tsx";

type SelectProps = {
  children: ReactNode;
  isFocused: Boolean;
  isToggle: Boolean;
  inputValue: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
  onToggle: () => void;
  onClear: () => void;
  onKeyDown: (keyCode: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
};

export default function Select({
  children,
  isFocused,
  isToggle,
  inputValue,
  onChange,
  onFocus,
  onBlur,
  onToggle,
  onClear,
  onClick,
  onKeyDown,
  containerRef,
}: SelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  // const windowSize = useWindowSize();

  const [availableSpace, setAvailableSpace] = useState<{
    top: Number | undefined;
    bottom: Number | undefined;
  }>();

  /**
   * @description select 엘레멘트 Y값 가져오기
   */
  // useEffect(() => {
  //   if (selectRef.current) {
  //     // 셀렉트 옵션 하단 넓이
  //     const bottom_height =
  //       windowSize.height -
  //       selectRef.current.getBoundingClientRect().top -
  //       SELECT_OPTION.HEIGHT;

  //     //셀렉트 옵션 상단 넓이
  //     const top_height =
  //       windowSize.height - bottom_height - SELECT_OPTION.HEIGHT;
  //     setAvailableSpace({ top: top_height, bottom: bottom_height });
  //   }
  // }, [selectRef, windowSize]);

  return (
    <>
      <div
        className={`select-component`}
        ref={selectRef}
        data-testid="select-component"
      >
        <div
          className={`MuiAutocomplete-root`}
          onKeyDown={(e) => onKeyDown(e.key)}
          tabIndex={0}
        >
          <div className="MuiFormControl-root">
            <div
              className={`MuiInputBase-root ${isFocused && "focused"} ${
                "selectOptionActive" && "clearVisible"
              }`}
            >
              <input
                className="MuiInputBase-input"
                ref={inputRef}
                type="text"
                value={inputValue}
                onClick={onClick}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
                placeholder={"Movie"}
              />
              <div className="MuiAutocomplete-endAdornment">
                <Button
                  dataTestId={"clear"}
                  activeClass={`MuiAutocomplete-clearIndicator ${
                    "selectOptionActive" &&
                    inputValue.length > 0 &&
                    "clearIndicator-visible"
                  }`}
                  children={
                    <svg>
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                  }
                  onClickHandler={() => {
                    onClear();
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                />

                <Button
                  dataTestId={"toggle"}
                  activeClass="MuiAutocomplete-arrowIndicator"
                  children={
                    <svg>
                      <path d="M7 10l5 5 5-5z"></path>
                    </svg>
                  }
                  onClickHandler={onToggle}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          ref={containerRef}
          data-testid="optionToggle"
          className={`base-popper-root ${isFocused && "open"} ${
            availableSpace?.top &&
            availableSpace?.bottom &&
            availableSpace.top > availableSpace.bottom &&
            "base-popper-root_bottom"
          }`}
        >
          <div className="base-popper-content">{isToggle && children}</div>
        </div>
      </div>
    </>
  );
}
