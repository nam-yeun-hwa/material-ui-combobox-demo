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
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectMaxWidth, setSelectMaxWidth] = useState(300);

  const [selectOptionActive, setSelectOptionActive] = useState(false);

  /**
   * @description select component 최대값 구하기
   */
  useEffect(() => {
    if (selectRef.current) {
      const width = selectRef.current.offsetWidth;
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
      setSelectOptionActive(false);
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
  const onClickOptionValue = (optionValue: string) => {
    console.log("옵션선택", optionValue);
    const findItem = options?.find((item) => item.value === optionValue);
    setIsFocused(false);
    if (findItem) {
      setInputValue(findItem.label);
      setSelectOptionActive(true);
    }
  };

  /**
   * @function onClickClearInputSearch
   * @description input search clear
   */
  const onClickClearInputSearch = () => {
    console.log("옵션 검색 텍스트 지우기");
    setInputValue("");
    setIsFocused(true);
    setSelectOptionActive(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onClickFocusOnHandler = () => {
    console.log("요기 아닌데");
    setIsFocused(true);
  };

  const onToggleOptionList = () => {
    console.log("ㅓㄴ미ㅏ러ㅣㅏ", !isFocused);
    setIsFocused(!isFocused);
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
              <button
                className={`MuiAutocomplete-clearIndicator ${
                  selectOptionActive &&
                  inputValue.length > 0 &&
                  "clearIndicator-visible"
                }`}
                onClick={onClickClearInputSearch}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
              >
                <svg>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </button>
              <button
                className="MuiAutocomplete-arrowIndicator"
                onClick={onToggleOptionList}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
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
        {/* 1. 선택항목이 없고 input값이 없을때 > 오리지날 option list*/}
        {selectOptionActive === false && inputValue?.length === 0 && (
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
        {/* 2. 선택항목이 없고 검색 input이 있을때 > 검색리스트 */}
        {selectOptionActive === false &&
          inputValue &&
          inputValue?.length > 0 && (
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
          )}

        {/* 선택항목이 있을때 > 선택항목이 Active 된 option list */}
        {selectOptionActive && (
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

        {isFocused && selectOptionActive && (
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
