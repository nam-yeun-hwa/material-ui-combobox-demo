type Props = {
  children: React.ReactNode;
  activeClass?: string;
  onClickHandler: () => void;
  dataTestId: string;
};

export default function Button({
  children,
  activeClass,
  onClickHandler,
  dataTestId,
}: Props) {
  return (
    <>
      <button
        data-testid={dataTestId}
        className={activeClass}
        onClick={onClickHandler}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        {children}
      </button>
    </>
  );
}
