import "./App.css";
import "./components/select.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { fetchTop100Films } from "./fetch/fetchLoading";
import Select from "./components/Select";
import { optionItem, selectOptionType } from "type/data";

function App() {
  const [options, setOptions] = useState<selectOptionType>([]);
  const [selectedValue, setSelectedValue] = useState<optionItem | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<selectOptionType>([]);
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchTop100Films();
      if (data) {
        setOptions(data);
      }
    };
    fetchData();
  }, [options]);

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

  useEffect(() => {
    console.log(filteredOptions);
  }, [filteredOptions]);

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
  const onHover = (optionItem: optionItem) => {
    // setOnEnterItem(optionItem);
  };

  return (
    <div className="container">
      <div className="contents">
        <Select
          isFocused={isFocused}
          isToggle={isToggle}
          inputValue={inputValue || ""}
          options={filteredOptions.length > 0 ? filteredOptions : options}
          onSelect={onSelect}
          onHover={onHover}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onToggle={onToggle}
          onClear={onClear}
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default App;
