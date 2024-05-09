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
  const [selectMaxWidth, setSelectMaxWidth] = useState(0);

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

  return (
    <>
      <div
        className={`MuiAutocomplete-root`}
        style={{ width: `${selectMaxWidth}px` }}
      >
        <div className="MuiFormControl-root">
          {/* <label className="MuiFormLabel-root">Movie</label> */}
          <div className={`MuiInputBase-root ${isFocused && "focused"}`}>
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
              <button className="MuiButtonBase-root">
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
              return <div className="option-item">{item.label}</div>;
            })}
          </>
        ) : (
          <>
            {options?.map((item) => {
              return (
                <div className="option-item">
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
