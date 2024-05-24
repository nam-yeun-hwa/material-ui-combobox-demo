import { optionItem, selectOptionType } from "type/data";
import "./optionItem.css";
import { useEffect, useRef } from "react";

type Props = {
  options: selectOptionType;
  isHoverIndex: number;
  isActiveIndex: string;
  onSelect: (option: optionItem, top: number) => void;
  onHover: (option: optionItem, optionIndex: number) => void;
  optionRefs: React.RefObject<(HTMLDivElement | null)[]>;
};

export default function OptionList({
  options,
  onSelect,
  onHover,
  isHoverIndex,
  isActiveIndex,
  optionRefs,
}: Props) {
  // const itemRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {options.map((item, index) => {
        return (
          <div
            // ref={itemRef}
            ref={(el) => optionRefs.current && (optionRefs.current[index] = el)}
            data-testid="option-list"
            key={item.value}
            className={`option-item option-item${index}
              ${
                isActiveIndex === item.value && isHoverIndex === index
                  ? "active-hover-item"
                  : (isActiveIndex === item.value && "active-option-item") ||
                    (isHoverIndex === index && "hover-option-item")
              }`}
            onClick={(e) => onSelect(item, e.nativeEvent.clientY)}
            onMouseOver={() => onHover(item, index)}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            {item.label}
          </div>
        );
      })}
    </>
  );
}
