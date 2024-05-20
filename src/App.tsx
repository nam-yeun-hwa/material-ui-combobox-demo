import "./App.css";
import "./components/select.css";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchTop100Films } from "./fetch/fetchLoading";
import Select from "./components/Select";
import { optionItem, selectOptionType } from "type/data";

function App() {
  const [options, setOptions] = useState<selectOptionType>([]);
  const [selectedValue, setSelectedValue] = useState<string>();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<selectOptionType>([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchTop100Films();
      if (data) {
        setOptions(data);
      }
    };
    fetchData();
  }, [options]);

  useEffect(() => {
    console.log(options);
  }, [options]);

  /**
   * @function handleInputChange
   * @description select option 검색
   */
  const onChange = (searchText: string) => {
    setInputValue(searchText);

    if (searchText.length > 0) {
      const filteredOption = options?.filter((optionItem) => {
        return optionItem.label.includes(searchText);
      });

      if (filteredOption.length > 0) {
        setFilteredOptions(filteredOption);
      } else {
        // setFilteredOptions(options as selectOptionType);
        setFilteredOptions([{ label: "No options", value: "0" }]);
      }
    }
  };

  /**
   * @function onFocusHandler
   * @description 포커스 이벤트 핸들러
   */
  const onFocus = () => {
    setIsFocused(true);
    // setIsOptionToggle(true);
  };

  /**
   * @function onBlurHandler
   * @deprecated 포커스 아웃 이벤트 핸들러
   */
  const onBlur = () => {
    setIsFocused(false);
    setInputValue("");
  };

  /**
   * @function onClickFocusOnHandler
   * @description input 클릭시 Focus On
   */
  const onClickFocusOnHandler = () => {
    // setIsFocused(true);
    // setIsOptionToggle(true);
  };

  /**
   * @function onClickOptionValue
   * @param optionValue 클릭한 option item
   * @description 클릭한 옵션
   */
  const onSelect = (optionItem: optionItem) => {
    // setIsOptionToggle(false);
    // if (optionItem) {
    //   setInputValue(optionItem.label);
    //   setSelectOptionActive(optionItem);
    // }
  };

  /**
   * @function onToggleOptionList
   * @description option toggle
   */
  const onToggle = () => {
    // setIsFocused(!isFocused);
    // setIsOptionToggle(!isOptionToggle);
  };

  const onClear = () => {};

  return (
    <div className="container">
      <div className="contents">
        <Select
          isFocused={isFocused}
          inputValue={inputValue || ""}
          options={filteredOptions.length > 0 ? filteredOptions : options}
          onSelect={onSelect}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onToggle={onToggle}
          onClear={onClear}
          onClickFocusOnHandler={onClickFocusOnHandler}
        />
      </div>
    </div>
  );
}

export default App;
