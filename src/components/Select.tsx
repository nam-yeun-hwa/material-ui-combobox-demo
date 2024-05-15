import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { optionItem, selectOptionType } from "type/data";
import "./select.css";
import OptionItem from "./OptionItem";
import useWindowSize from "../hook/useWindowSize.ts";
import { SELECT_OPTION } from "../constant/constant";
import Button from "./Button.tsx";

type SelectProps = {
  options: selectOptionType | undefined;
};

export default function Select(props: SelectProps) {
  const { options } = props;
  const [isFocused, setIsFocused] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [optionSearchList, setOptionSearchList] = useState<
    selectOptionType | undefined
  >();
  const [selectMaxWidth, setSelectMaxWidth] = useState(300);

  const [selectOptionActive, setSelectOptionActive] = useState<
    optionItem | undefined
  >();

  const [enterItem, setOnEnterItem] = useState<optionItem | undefined>();
  const [isOptionToggle, setIsOptionToggle] = useState(false);

  const optionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const windowSize = useWindowSize();

  const [availableSpace, setAvailableSpace] = useState<{
    top: Number | undefined;
    bottom: Number | undefined;
  }>();

  /**
   * @description select 엘레멘트 Y값 가져오기
   */
  useEffect(() => {
    if (selectRef.current) {
      // 셀렉트 옵션 하단 넓이
      const bottom_height =
        windowSize.height -
        selectRef.current.getBoundingClientRect().top -
        SELECT_OPTION.HEIGHT;

      //셀렉트 옵션 상단 넓이
      const top_height =
        windowSize.height - bottom_height - SELECT_OPTION.HEIGHT;
      setAvailableSpace({ top: top_height, bottom: bottom_height });
    }
  }, [selectRef, windowSize]);

  /**
   * @description select component 최대값 구하기
   */
  useEffect(() => {
    if (optionRef.current) {
      const width = optionRef.current.offsetWidth;
      setSelectMaxWidth((preState) => {
        return Math.max(preState, width);
      });
    }
  }, [options, selectMaxWidth]);

  /**
   * @description input검색에 따른 option filter
   */
  useEffect(() => {
    if (inputValue.length > 0) {
      const filteredItems = options?.filter((optionItem) => {
        return optionItem.label.includes(inputValue);
      });

      if (filteredItems && filteredItems?.length > 0) {
        setOptionSearchList(filteredItems);
      } else {
        setOptionSearchList([{ label: "No options", value: "0" }]);
      }
    }
  }, [inputValue, setOptionSearchList]);

  /**
   * @description selectOptionActive 초기화 시켜주기
   * option 클릭 후 input 해당 옵션값의 텍스트가 들어가 있을때 옵션 값을 다 지워줄 경우에는
   * selectOptionActive를 false로 초기화 해준다.
   */
  useEffect(() => {
    if (inputValue.length === 0) {
      setSelectOptionActive(undefined);
    }
  }, [inputValue]);

  /**
   * @function handleInputChange
   * @description select option 검색
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * @function onFocusHandler
   * @description 포커스 이벤트 핸들러
   */
  const onFocusHandler = () => {
    setIsFocused(true);
    setIsOptionToggle(true);
  };

  /**
   * @function onBlurHandler
   * @deprecated 포커스 아웃 이벤트 핸들러
   */
  const onBlurHandler = () => {
    setIsFocused(false);
    setInputValue("");
  };

  /**
   * @function onClickOptionValue
   * @param optionValue 클릭한 option item
   * @description 클릭한 옵션
   */
  const onClickOptionItem = (optionItem: optionItem) => {
    setIsOptionToggle(false);
    if (optionItem) {
      setInputValue(optionItem.label);
      setSelectOptionActive(optionItem);
    }
  };

  /**
   * @function onClickClearInputSearch
   * @description input search clear
   */
  const onClickClearInputSearch = () => {
    setInputValue("");
    setIsFocused(true);
    setOnEnterItem(undefined);
    setSelectOptionActive(undefined);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  /**
   * @function onClickFocusOnHandler
   * @description input 클릭시 Focus On
   */
  const onClickFocusOnHandler = () => {
    setIsFocused(true);
    setIsOptionToggle(true);
  };

  /**
   * @function onToggleOptionList
   * @description option toggle
   */
  const onToggleOptionList = () => {
    // setIsFocused(!isFocused);
    setIsOptionToggle(!isOptionToggle);
  };

  /**
   * @function onMouseOverHandler
   * @param optionItem
   */
  const onMouseOverHandler = (optionItem: optionItem) => {
    setOnEnterItem(optionItem);
  };

  /**
   * @function onKeyboardHandler
   * @description 키보드 이벤트
   */
  const onKeyboardHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Enter":
        console.log("Enter 키가 눌렸습니다.");
        if (enterItem) {
          onClickOptionItem(enterItem);
        }
        break;
      case "ArrowUp":
        console.log("위쪽 화살표 키가 눌렸습니다.");
        if (isOptionToggle) {
          setOnEnterItem((prevState) => {
            if (prevState) {
              const currentValue = Number(prevState?.value);
              return options?.find(
                (item) => item.value === String(currentValue - 1)
              );
            } else {
              return options && options[99];
            }
          });
        } else {
          setIsOptionToggle(true);
        }

        break;
      case "ArrowDown":
        if (isOptionToggle) {
          setOnEnterItem((prevState) => {
            if (prevState) {
              const currentValue = Number(prevState?.value);
              return options?.find(
                (item) => item.value === String(currentValue + 1)
              );
            } else {
              return options && options[0];
            }
          });
        } else {
          setIsOptionToggle(true);
        }
        console.log("아래쪽 화살표 키가 눌렸습니다.");

        break;
      default:
        break;
    }
  };

  return (
    <>
      <div
        className={`select-component`}
        ref={selectRef}
        data-testid="select-component"
      >
        <div
          className={`MuiAutocomplete-root`}
          style={{ width: `${selectMaxWidth}px` }}
          onKeyDown={onKeyboardHandler}
          tabIndex={0}
        >
          <div className="MuiFormControl-root">
            {/* <label className="MuiFormLabel-root">Movie</label> */}
            <div
              className={`MuiInputBase-root ${isFocused && "focused"} ${
                selectOptionActive && "clearVisible"
              }`}
            >
              <input
                className="MuiInputBase-input"
                ref={inputRef}
                type="text"
                value={inputValue}
                onClick={onClickFocusOnHandler}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onChange={handleInputChange}
                placeholder={"Movie"}
              />
              <div className="MuiAutocomplete-endAdornment">
                <Button
                  dataTestId={"clear"}
                  activeClass={`MuiAutocomplete-clearIndicator ${
                    selectOptionActive &&
                    inputValue.length > 0 &&
                    "clearIndicator-visible"
                  }`}
                  children={
                    <svg>
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                  }
                  onClickHandler={onClickClearInputSearch}
                />

                <Button
                  dataTestId={"toggle"}
                  activeClass="MuiAutocomplete-arrowIndicator"
                  children={
                    <svg>
                      <path d="M7 10l5 5 5-5z"></path>
                    </svg>
                  }
                  onClickHandler={onToggleOptionList}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          data-testid="optionToggle"
          className={`base-popper-root ${
            isFocused && isOptionToggle && "open"
          } ${
            availableSpace?.top &&
            availableSpace?.bottom &&
            availableSpace.top > availableSpace.bottom &&
            "base-popper-root_bottom"
          }`}
          style={{ width: `${selectMaxWidth > 300 && selectMaxWidth}px` }}
        >
          <div className="base-popper-content" ref={optionRef}>
            {/* 1. 선택항목이 없고 input값이 없을때 > 오리지날 option list*/}
            {selectOptionActive === undefined && inputValue?.length === 0 && (
              <OptionItem
                options={options}
                onClickOptionItem={onClickOptionItem}
                onMouseOverHandler={onMouseOverHandler}
                activeItem={selectOptionActive}
                hoverItem={enterItem}
              />
            )}
            {/* 2. 선택항목이 없고 검색 input이 있을때 > 검색리스트 */}
            {selectOptionActive === undefined &&
              inputValue &&
              inputValue?.length > 0 && (
                <OptionItem
                  options={optionSearchList}
                  onClickOptionItem={onClickOptionItem}
                  onMouseOverHandler={onMouseOverHandler}
                  activeItem={selectOptionActive}
                  hoverItem={enterItem}
                />
              )}

            {/* 3. 선택항목이 있을때 > 선택항목이 Active 된 option list */}
            {selectOptionActive && (
              <OptionItem
                options={options}
                onClickOptionItem={onClickOptionItem}
                onMouseOverHandler={onMouseOverHandler}
                activeItem={selectOptionActive}
                hoverItem={enterItem}
              />
            )}
            {/* 4. focus상태이고 선택된 항목이 있을때 */}
            {isOptionToggle && selectOptionActive && (
              <OptionItem
                options={options}
                onClickOptionItem={onClickOptionItem}
                onMouseOverHandler={onMouseOverHandler}
                activeItem={selectOptionActive}
                hoverItem={enterItem}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
