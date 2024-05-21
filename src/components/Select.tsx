import {
  ChangeEvent,
  Children,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { optionItem, selectOptionType } from "type/data";
import "./select.css";

import useWindowSize from "../hook/useWindowSize.ts";
import { SELECT_OPTION } from "../constant/constant";
import Button from "./Button.tsx";
import OptionList from "./OptionList.tsx";

type SelectProps = {
  children: ReactNode;
  isFocused: Boolean;
  isToggle: Boolean;
  // onSelect: (select: optionItem) => void;
  inputValue: string;
  // options: selectOptionType;
  onChange: (value: string) => void;
  // onHover: (select: optionItem) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
  onToggle: () => void;
  onClear: () => void;
};

export default function Select({
  children,
  isFocused,
  isToggle,
  // onSelect,
  inputValue,
  // options,
  onChange,
  onFocus,
  onBlur,
  // onHover,
  onToggle,
  onClear,
  onClick,
}: SelectProps) {
  const optionRef = useRef<HTMLDivElement>(null);
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

  /**
   * @description input검색에 따른 option filter
   */
  // useEffect(() => {
  //   if (inputValue.length > 0) {
  //     const filteredItems = options?.filter((optionItem) => {
  //       return optionItem.label.includes(inputValue);
  //     });

  //     if (filteredItems && filteredItems?.length > 0) {
  //       setOptionSearchList(filteredItems);
  //     } else {
  //       setOptionSearchList([{ label: "No options", value: "0" }]);
  //     }
  //   }
  // }, [inputValue, setOptionSearchList]);

  /**
   * @description selectOptionActive 초기화 시켜주기
   * option 클릭 후 input 해당 옵션값의 텍스트가 들어가 있을때 옵션 값을 다 지워줄 경우에는
   * selectOptionActive를 false로 초기화 해준다.
   */
  // useEffect(() => {
  //   if (inputValue.length === 0) {
  //     setSelectOptionActive(undefined);
  //     setIsOptionToggle(true);
  //   }
  // }, [inputValue]);

  /**
   * @function handleInputChange
   * @description select option 검색
   */
  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  /**
   * @function onFocusHandler
   * @description 포커스 이벤트 핸들러
   */
  // const onFocusHandler = () => {
  //   setIsFocused(true);
  //   setIsOptionToggle(true);
  // };

  /**
   * @function onBlurHandler
   * @deprecated 포커스 아웃 이벤트 핸들러
   */
  // const onBlurHandler = () => {
  //   setIsFocused(false);
  //   setInputValue("");
  // };

  /**
   * @function onClickOptionValue
   * @param optionValue 클릭한 option item
   * @description 클릭한 옵션
   */
  // const onClickOptionItem = (optionItem: optionItem) => {
  //   setIsOptionToggle(false);
  //   if (optionItem) {
  //     setInputValue(optionItem.label);
  //     setSelectOptionActive(optionItem);
  //   }
  // };

  /**
   * @function onClickClearInputSearch
   * @description input search clear
   */
  // const onClickClearInputSearch = () => {
  //   setInputValue("");

  //   setIsFocused(true);
  //   setOnEnterItem(undefined);
  //   setSelectOptionActive(undefined);
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // };

  /**
   * @function onClickFocusOnHandler
   * @description input 클릭시 Focus On
   */
  // const onClickFocusOnHandler = () => {
  //   setIsFocused(true);
  //   setIsOptionToggle(true);
  // };

  /**
   * @function onToggleOptionList
   * @description option toggle
   */
  // const onToggleOptionList = () => {
  //   // setIsFocused(!isFocused);
  //   setIsOptionToggle(!isOptionToggle);
  // };

  /**
   * @function onMouseOverHandler
   * @param optionItem
   */
  // const onMouseOverHandler = (optionItem: optionItem) => {
  //   setOnEnterItem(optionItem);
  // };
  /**
   * @function onKeyboardHandler
   * @description 키보드 이벤트
   */
  // const onKeyboardHandler = (e: KeyboardEvent<HTMLDivElement>) => {
  //   switch (e.key) {
  //     case "Enter":
  //       console.log("Enter 키가 눌렸습니다.");
  //       if (enterItem) {
  //         onClickOptionItem(enterItem);
  //       }
  //       break;
  //     case "ArrowUp":
  //       console.log("위쪽 화살표 키가 눌렸습니다.");
  //       if (isOptionToggle) {
  //         setOnEnterItem((prevState) => {
  //           if (prevState) {
  //             const currentValue = Number(prevState?.value);
  //             return options?.find(
  //               (item) => item.value === String(currentValue - 1)
  //             );
  //           } else {
  //             return options && options[99];
  //           }
  //         });
  //       } else {
  //         setIsOptionToggle(true);
  //       }

  //       break;
  //     case "ArrowDown":
  //       if (isOptionToggle) {
  //         setOnEnterItem((prevState) => {
  //           if (prevState) {
  //             const currentValue = Number(prevState?.value);
  //             return options?.find(
  //               (item) => item.value === String(currentValue + 1)
  //             );
  //           } else {
  //             return options && options[0];
  //           }
  //         });
  //       } else {
  //         setIsOptionToggle(true);
  //       }
  //       console.log("아래쪽 화살표 키가 눌렸습니다.");

  //       break;
  //     default:
  //       break;
  //   }
  // };
  return (
    <>
      <div
        className={`select-component`}
        ref={selectRef}
        data-testid="select-component"
      >
        <div
          className={`MuiAutocomplete-root`}
          // onKeyDown={onKeyboardHandler}
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
          data-testid="optionToggle"
          className={`base-popper-root ${isFocused && "open"} ${
            availableSpace?.top &&
            availableSpace?.bottom &&
            availableSpace.top > availableSpace.bottom &&
            "base-popper-root_bottom"
          }`}
        >
          <div className="base-popper-content" ref={optionRef}>
            {
              isToggle && children
              // <OptionList
              //   onkeyboard={onkeyboard}
              //   options={options}
              //   onSelect={onSelect}
              //   onHover={onHover}
              // />
            }
            {/* {<div>test</div>} */}
          </div>
        </div>
      </div>
    </>
  );
}
