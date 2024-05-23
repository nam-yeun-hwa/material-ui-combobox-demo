import { optionItem, selectOptionType } from "type/data";
import "./optionItem.css";

type Props = {
  options: selectOptionType;
  isHoverIndex: number;
  isActiveIndex: string;
  onSelect: (option: optionItem) => void;
  onHover: (option: optionItem, optionIndex: number) => void;
};

export default function OptionList({
  options,
  onSelect,
  onHover,
  isHoverIndex,
  isActiveIndex,
}: Props) {
  return (
    <>
      {options.map((item, index) => {
        return (
          <div
            data-testid="option-list"
            key={item.value}
            className={`option-item 
              ${
                isActiveIndex === item.value && isHoverIndex === index
                  ? "active-hover-item"
                  : (isActiveIndex === item.value && "active-option-item") ||
                    (isHoverIndex === index && "hover-option-item")

                // (isHoverIndex === index && "hover-option-item") ||
                // (isActiveIndex === item.value && "active-option-item")
              }`}
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
