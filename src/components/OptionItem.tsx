import { optionItem, selectOptionType } from "type/data";
import "./optionItem.css";

type Props = {
  options?: selectOptionType;
  onClickOptionItem: (option: optionItem) => void;
  onMouseOverHandler: (option: optionItem) => void;
  activeItem?: optionItem;
  hoverItem?: optionItem;
};

export default function OptionItem({
  options,
  onClickOptionItem,
  onMouseOverHandler,
  activeItem,
  hoverItem,
}: Props) {
  return (
    <>
      {options?.map((item) => {
        return (
          <div
            key={item.value}
            className={`option-item ${
              (hoverItem?.value === item.value && "hover-option-item ") ||
              (activeItem?.value === item.value && "active-option-item")
            }`}
            onClick={() => onClickOptionItem(item)}
            onMouseOver={() => onMouseOverHandler(item)}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            [{item.value}]-{item.label}
          </div>
        );
      })}
    </>
  );
}
