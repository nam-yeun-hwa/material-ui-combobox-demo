import { optionItem, selectOptionType } from "type/data";
import "./optionItem.css";
import { useEffect } from "react";

type Props = {
  options: selectOptionType;
  onSelect: (option: optionItem) => void;
  isHoverIndex: number;
  onHover: (option: optionItem, optionIndex: number) => void;
};

export default function OptionList({
  options,
  onSelect,
  isHoverIndex,
  onHover,
}: Props) {
  useEffect(() => {
    console.log(options);
  }, [options]);
  return (
    <>
      {options.map((item, index) => {
        return (
          <div
            data-testid="option-list"
            key={item.value}
            className={
              `option-item 
              ${isHoverIndex === index && "hover-option-item"}`
              // (activeItem?.value === item.value && "active-option-item")
            }
            onClick={() => onSelect(item)}
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
