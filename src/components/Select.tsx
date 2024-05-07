type Options = Array<{ value: string; label: string }>;

type SelectProps = {
  value?: string | null;
  options: Options | (() => Promise<Options>);
  onChange?: (value: string) => void;
};

export default function Select(props: SelectProps) {
  const { value, options, onChange } = props;
  return <>{value}</>;
}
