import { optionItem, selectOptionType } from "type/data";
import "./optionItem.css";
import { useEffect } from "react";

type Props = {
  options: selectOptionType;
  onSelect: (option: optionItem) => void;
  onHover: (option: optionItem) => void;
  onkeyboard: (keyCode: string) => void;
};

export default function OptionList({
  options,
  onSelect,
  onHover,
  onkeyboard,
}: Props) {
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
            onKeyDown={(e) => onkeyboard(e.key)}
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
