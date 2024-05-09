import { ChangeEvent, useEffect, useRef, useState } from "react";
import { selectOptionType } from "type/data";
import "./select.css";

type SelectProps = {
  value?: string | null;
  options: selectOptionType | undefined;
  onChange?: (value: string) => void;
};

export default function Select(props: SelectProps) {
  const { value, options, onChange } = props;
  const [isFocused, setIsFocused] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [optionSearchList, setOptionSearchList] = useState<
    selectOptionType | undefined
  >();

  const selectRef = useRef<HTMLDivElement>(null);
  const [selectMaxWidth, setSelectMaxWidth] = useState(300);

  /**
   * @description select component 최대값 구하기
   */
  useEffect(() => {
    if (selectRef.current) {
      const width = selectRef.current.offsetWidth;
      setSelectMaxWidth((preState) => {
        return Math.max(preState, width);
      });
      console.log("selectWidth", selectMaxWidth);
    }
  }, [options, selectMaxWidth]);

  /**
   * @description input검색에 따른 option filter
   */
  useEffect(() => {
    console.log("inputValue", inputValue);
    if (inputValue.length > 0) {
      const filteredItems = options?.filter((optionItem) => {
        return optionItem.label.includes(inputValue);
      });
      if (filteredItems && filteredItems?.length > 0) {
        setOptionSearchList(filteredItems);
      }
    }
  }, [inputValue, setOptionSearchList]);

  /**
   * @function handleInputChange
   * @description select option 검색
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * @function handleFocus
   * @description 포커스 이벤트 핸들러
   */
  const handleFocus = () => {
    setIsFocused(true);
  };

  /**
   * @function handleBlur
   * @deprecated 포커스 아웃 이벤트 핸들러
   */
  const handleBlur = () => {
    setIsFocused(false);
  };

  /**
   * @function onClickOptionValue
   * @param optionValue 클릭한 option item
   * @description 클릭한 옵션
   */
  const onClickOptionValue = (optionValue: string) => {
    console.log("optionValue", optionValue);
    const findItem = options?.find((item) => item.value === optionValue);

    if (findItem) {
      setInputValue(findItem.label);
      // setIsFocused(false);
    }
  };

  /**
   * @function onClickClearInputSearch
   * @description input search clear
   */
  const onClickClearInputSearch = () => {
    setInputValue("");
  };

  return (
    <>
      <div
        className={`MuiAutocomplete-root`}
        style={{ width: `${selectMaxWidth}px` }}
      >
        <div className="MuiFormControl-root">
          {/* <label className="MuiFormLabel-root">Movie</label> */}
          <div
            className={`MuiInputBase-root ${isFocused && "focused"} ${
              inputValue && "clearVisible"
            }`}
          >
            <input
              className="MuiInputBase-input"
              type="text"
              value={inputValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder={"Movie"}
            />
            <div className="MuiAutocomplete-endAdornment">
              <button
                className={`MuiAutocomplete-clearIndicator ${
                  inputValue && "clearIndicator-visible"
                }`}
                onClickCapture={onClickClearInputSearch}
              >
                <svg>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </button>
              <button
                className="MuiAutocomplete-arrowIndicator"
                onClickCapture={onClickClearInputSearch}
              >
                <svg>
                  <path d="M7 10l5 5 5-5z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={selectRef}
        className={`base-popper-root ${isFocused && "open"}`}
      >
        {inputValue && inputValue?.length > 0 ? (
          <>
            {optionSearchList?.map((item) => {
              return (
                <div
                  key={item.value}
                  className="option-item"
                  onClick={() => {
                    onClickOptionValue(item.value);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </>
        ) : (
          <>
            {options?.map((item) => {
              return (
                <div
                  key={item.value}
                  className="option-item"
                  onClick={() => onClickOptionValue(item.value)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  [{item.value}]-{item.label}
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
