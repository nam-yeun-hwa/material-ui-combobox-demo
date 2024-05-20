import { optionItem, selectOptionType } from "type/data";
import "./optionItem.css";
import { useEffect } from "react";

type Props = {
  options: selectOptionType;
  onSelect: (option: optionItem) => void;
  onHover: (option: optionItem) => void;
};

export default function OptionItem({ options, onSelect, onHover }: Props) {
  return (
    <>
      {options.map((item) => {
        return (
          <div
            data-testid="option-list"
            key={item.value}
            className={
              `option-item `
              // (hoverItem?.value === item.value && "hover-option-item ") ||
              // (activeItem?.value === item.value && "active-option-item")
            }
            onClick={() => onSelect(item)}
            onMouseOver={() => onHover(item)}
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
