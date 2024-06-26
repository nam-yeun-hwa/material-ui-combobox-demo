import "./App.css";
import "./components/select.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchOptionList } from "./fetch/fetchLoading";
import Select from "./components/Select";
import { optionItem, selectOptionType } from "type/data";
import OptionList from "./components/OptionList";
import useScrollPosition from "./hook/useScrollPosition";

function App() {
  const [options, setOptions] = useState<selectOptionType>([]);
  const [filteredOptions, setFilteredOptions] = useState<selectOptionType>([]);
  const [selectedValue, setSelectedValue] = useState<optionItem | undefined>();
  const [hoveredValue, setHoveredValue] = useState<optionItem | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [filteredIndex, setFilteredIndex] = useState<number | undefined>();
  const [isFocused, setIsFocused] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [scrollRelativeTop, setScrollRelativeTop] = useState(0);

  const [containerRef, scrollTop, scrollTo] = useScrollPosition();

  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * @description option 데이터 가져오기
   */
  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchOptionList();
      if (data) {
        setOptions(data);
      }
    };
    fetchData();
  }, [options]);

  // useEffect(() => {
  //   console.log("isToggle", isToggle);
  // }, [isToggle]);

  // useEffect(() => {
  //   console.log("options", options);
  // }, [isToggle]);

  // useEffect(() => {
  //   console.log("filteredOptions", filteredOptions);
  // }, [filteredOptions]);

  // useEffect(() => {
  //   console.log("selectedValue", selectedValue);
  // }, [selectedValue]);

  // useEffect(() => {
  //   console.log("★★★selectedValue★★★", selectedValue);
  // }, [selectedValue]);

  /**
   * @description isToggle가 true일때 옵션스크롤 Y값 상단 고정의 값으로
   */
  useEffect(() => {
    if (isToggle) {
      scrollTo(scrollRelativeTop);
    }
  }, [isToggle]);

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
    setHoveredValue(undefined);
  };

  /**
   * @function scrollPostionY
   * @description option item 좌표를 찾아 optionItem이 화면에 보일때 포지션Y 설정
   */
  const scrollPostionY = () => {
    // if (containerRef.current && filteredIndex !== undefined) {
    //   const optionRect = optionRefs.current[filteredIndex]!.offsetTop;
    //   console.log("optionRect", optionRect);
    //   setScrollRelativeTop(optionRect);
    // }
    if (optionRefs.current && filteredIndex !== undefined) {
      const optionRect = optionRefs.current[filteredIndex]!.offsetTop;

      setScrollRelativeTop(optionRect);
    }
  };

  /**
   * @function onMoveScroll
   * @param filteredIndex 현재 active한 option index
   * @param dir 키보드 up, down을 -1,1
   * @description 키보드 상하 방향키 입력에 따라 스크롤이 이동 할수 있도록 한다.
   */
  const onMoveScroll = (filteredIndex: number, dir: number) => {
    console.log(filteredIndex);

    const lastCount =
      filteredOptions.length > 0 ? filteredOptions.length : options.length;
    const viewCount = 6;

    if (
      filteredIndex &&
      filteredIndex >= viewCount &&
      filteredIndex < lastCount
    ) {
      if (containerRef.current) {
        const scrollPosition =
          scrollTop + optionRefs.current[filteredIndex]!.offsetHeight * dir;
        console.log("scrollTop", scrollTop, "scrollPosition", scrollPosition);

        scrollTo(scrollPosition);
      }
    }
  };

  /**
   * @function onSelect
   * @param optionValue 클릭한 option item
   * @description 클릭한 옵션
   */
  const onSelect = (optionItem: optionItem, top: number) => {
    setIsToggle(false);
    if (optionItem) {
      setInputValue(optionItem.label);
      setSelectedValue(optionItem);
    }
    scrollPostionY();
  };

  /**
   * @function onToggle
   * @description option toggle
   */
  const onToggle = () => {
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
    setFilteredIndex(undefined);
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
    // console.log("hover", filterIndex);
    setHoveredValue({ label: optionItem.label, value: optionItem.value });
    setFilteredIndex(filterIndex);
  };

  /**
   * @function onKeyboardHandler
   * @description 키보드 이벤트
   */
  const onKeyDown = (keyCode: string) => {
    const len = filteredOptions.length || options.length;
    console.log("keyCode", keyCode);

    if (!isToggle) {
      setIsToggle(true);
      return;
    }

    switch (keyCode) {
      case "Enter":
        console.log("Enter 키가 눌렸습니다.");
        if (filteredIndex !== undefined) {
          const selectItem = options.find(
            (_, index) => index === filteredIndex
          );

          if (selectItem) {
            setSelectedValue(selectItem);
            setInputValue(selectItem.label);
          }

          onToggle();
          scrollPostionY();
        }

        break;
      case "ArrowUp":
        setFilteredIndex((prevState) => {
          if (prevState !== undefined) {
            if (prevState > 0) {
              const currentIndex = (prevState - 1) % len;
              onMoveScroll(currentIndex, -1);
              return currentIndex;
            }
            onMoveScroll(len - 1, -1);
            return len - 1;
          }
          onMoveScroll(len - 1, -1);
          return len - 1;
        });

        scrollPostionY();

        break;
      case "ArrowDown":
        setFilteredIndex((prevState) => {
          if (prevState !== undefined) {
            if (prevState + 1 < len) {
              const currentIndex = (prevState + 1) % len;
              onMoveScroll(currentIndex, 1);
              return currentIndex;
            }
            onMoveScroll(0, 1);
            return 0;
          }
          onMoveScroll(0, 1);
          return 0;
        });

        scrollPostionY();

        break;
      default:
        console.log("key filteredIndex", filteredIndex);
        break;
    }
  };

  return (
    <div className="container">
      <div className="contents">
        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            borderRadius: "12px",
            border: "1px solid hsl(215, 15%, 92%)",
            margin: "0",
            padding: "24px",
          }}
        >
          <Select
            isFocused={isFocused}
            isToggle={isToggle}
            inputValue={inputValue || ""}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onToggle={onToggle}
            onClear={onClear}
            onClick={onClick}
            onKeyDown={onKeyDown}
            containerRef={containerRef}
          >
            <OptionList
              optionRefs={optionRefs}
              options={filteredOptions.length > 0 ? filteredOptions : options}
              onSelect={onSelect}
              onHover={onHover}
              isHoverIndex={filteredIndex ?? -1}
              isActiveIndex={selectedValue ? selectedValue.value : ""}
            />
          </Select>
        </div>
      </div>
    </div>
  );
}

export default App;
