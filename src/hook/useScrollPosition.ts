import { useRef, useEffect, useState, useCallback } from "react";

type UseScrollPositionReturnType = [
  React.RefObject<HTMLDivElement>,
  number,
  (position: number) => void
];

const useScrollPosition = (): UseScrollPositionReturnType => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  const scrollTo = useCallback((position: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = position;
      setScrollTop(position);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  return [containerRef, scrollTop, scrollTo];
};

export default useScrollPosition;
