type Props = {
  children: React.ReactNode;
  activeClass?: string;
  onClickHandler: () => void;
};

export default function Button({
  children,
  activeClass,
  onClickHandler,
}: Props) {
  return (
    <>
      <button
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
