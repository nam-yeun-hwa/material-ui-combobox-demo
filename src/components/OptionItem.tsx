import { optionItem, selectOptionType } from "type/data";
import "./optionItem.css";

type Props = {
  options: selectOptionType | undefined;
  onClickOptionItem: (option: optionItem) => void;
};

export default function OptionItem({ options, onClickOptionItem }: Props) {
  return (
    <>
      {options?.map((item) => {
        return (
          <div
            key={item.value}
            className="option-item"
            onClick={() => onClickOptionItem(item)}
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
