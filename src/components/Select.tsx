import { useEffect } from "react";
import { selectOptionType } from "type/data";

type SelectProps = {
  value?: string | null;
  options: selectOptionType | undefined | (() => Promise<selectOptionType>);
  onChange?: (value: string) => void;
};

export default function Select(props: SelectProps) {
  const { value, options, onChange } = props;

  useEffect(() => {
    console.log("options", options);
  }, [options]);
  return <>{value}</>;
}
