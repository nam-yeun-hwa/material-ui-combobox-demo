import "./App.css";
import "./components/select.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { fetchOptionList } from "./fetch/fetchLoading";
import Select from "./components/Select";
import { optionItem, selectOptionType } from "type/data";
import OptionList from "./components/OptionList";

function App() {
  const [options, setOptions] = useState<selectOptionType>([]);
  const [filteredOptions, setFilteredOptions] = useState<selectOptionType>([]);
  const [selectedValue, setSelectedValue] = useState<optionItem | undefined>();
  const [hoveredValue, setHoveredValue] = useState<optionItem | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [filteredIndex, setFilteredIndex] = useState<number | undefined>();
  const [isHoverItem, setIsHoverItem] = useState<optionItem | undefined>();
  const [isFocused, setIsFocused] = useState(false);
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchOptionList();
      if (data) {
        setOptions(data);
      }
    };
    fetchData();
  }, [options]);

  useEffect(() => {
    console.log("isToggle", isToggle);
  }, [isToggle]);

  // useEffect(() => {
  //   console.log("options", options);
  // }, [isToggle]);

  useEffect(() => {
    console.log("filteredOptions", filteredOptions);
  }, [filteredOptions]);

  useEffect(() => {
    console.log("selectedValue", selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    console.log("filteredIndex", filteredIndex);
  }, [filteredIndex]);

  useEffect(() => {
    console.log("hover Item", isHoverItem);
  }, [isHoverItem]);

  /**
   * @function onChange
   * @description select option 검색
   */
  const onChange = (searchText: string) => {
    setInputValue(searchText);

    if (inputValue.length > 0) {
      const filteredOption = options?.filter((optionItem) => {
        return optionItem.label.includes(searchText);
      });

      if (filteredOption.length > 0) {
        setFilteredOptions(filteredOption);
      } else {
        setFilteredOptions([{ label: "No options", value: "0" }]);
      }
      //input value가 있으면 option list 화면에 무조건 보이기
      setIsToggle(true);
    }
  };

  /**
   * @function onFocus
   * @description 포커스 이벤트 핸들러
   */
  const onFocus = () => {
    setIsFocused(true);
    setIsToggle(true);
  };

  /**
   * @function onBlur
   * @deprecated 포커스 아웃 이벤트 핸들러
   */
  const onBlur = () => {
    setIsFocused(false);
    setInputValue("");
  };

  /**
   * @function onClick
   * @description input 클릭시 Focus On
   */
  const onClick = () => {
    setIsFocused(true);
    setIsToggle(true);
  };

  /**
   * @function onSelect
   * @param optionValue 클릭한 option item
   * @description 클릭한 옵션
   */
  const onSelect = (optionItem: optionItem) => {
    setIsToggle(false);
    if (optionItem) {
      setInputValue(optionItem.label);
      setSelectedValue(optionItem);
    }
  };

  /**
   * @function onToggle
   * @description option toggle
   */
  const onToggle = () => {
    // setIsFocused(!isFocused);
    setIsToggle(!isToggle);
  };

  /**
   * @function onClear
   * @description 선택 옵션 삭제
   */
  const onClear = () => {
    setInputValue("");
    setIsToggle(true);
    setIsFocused(true);
    setFilteredOptions([]);

    //   setOnEnterItem(undefined);
    setSelectedValue(undefined);
  };

  /**
   * @function onMouseOverHandler
   * @param optionItem
   */
  const onHover = (optionItem: optionItem, filterIndex: number) => {
    // 메모
    // hover된 객체를 구지 스테이트에 넣어서 관리하는 이유는
    // hover된 객체와 키보드의 Enter, ArrowUp, ArrowDown이 연동되어 움직이기 때문이다
    // 그래서 hover 됫을때마다 객체를 실시간으로 업데이트 해준다.
    console.log("hover", filterIndex);
    setIsHoverItem({ label: optionItem.label, value: optionItem.value });
    setFilteredIndex(filterIndex);
  };

  /**
   * @function onKeyboardHandler
   * @description 키보드 이벤트
   */
  const onKeyDown = (keyCode: string) => {
    const len = filteredOptions.length || options.length;
    console.log("keyCode", keyCode);
    switch (keyCode) {
      case "Enter":
        console.log("Enter 키가 눌렸습니다.", isHoverItem);
        // if (isHoverItem) {
        //   setSelectedValue({
        //     label: isHoverItem.label,
        //     value: isHoverItem.value,
        //   });
        //   setInputValue(isHoverItem.label);
        // }

        break;
      case "ArrowUp":
        console.log("위쪽 화살표 키가 눌렸습니다.");
        setFilteredIndex((prevState) => {
          console.log(prevState);
          if (prevState !== undefined) {
            if (prevState > 0) {
              return (prevState - 1) % len;
            }
            return len - 1;
          }
          return len - 1;
        });

        // setHoveredValue(filteredOptions)

        break;
      case "ArrowDown":
        console.log("아래쪽 화살표 키가 눌렸습니다.");
        setFilteredIndex((prevState) => {
          console.log(prevState);
          if (prevState !== undefined) {
            if (prevState + 1 < len) {
              return (prevState + 1) % len;
            }
            return 0;
          }
          return 0;
        });

        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="contents">
        <Select
          isFocused={isFocused}
          isToggle={isToggle}
          inputValue={inputValue || ""}
          // options={filteredOptions.length > 0 ? filteredOptions : options}
          // onSelect={onSelect}
          // onHover={onHover}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onToggle={onToggle}
          onClear={onClear}
          onClick={onClick}
          onKeyDown={onKeyDown}
        >
          <OptionList
            // options={options}
            options={filteredOptions.length > 0 ? filteredOptions : options}
            onSelect={onSelect}
            onHover={onHover}
            isHoverIndex={filteredIndex ?? -1}
          />
        </Select>
      </div>
    </div>
  );
}

export default App;
