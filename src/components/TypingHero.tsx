import { useEffect, useMemo, useState } from "react";

export default function TypingHero() {
  const phrases = useMemo(
    () => ["Designed for Impact", "Built to Last", "Engineering the Future"],
    [],
  );

//   const baseText = "Delivering Engineering ";

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    let timeout: ReturnType<typeof setTimeout>;

    // ⭐ Pause when word fully typed
    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 1400);
      return () => clearTimeout(timeout);
    }

    // ⭐ FIX: wrap synchronous state change in timeout
    if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      }, 0);

      return () => clearTimeout(timeout);
    }

    // ⭐ Typing / deleting
    timeout = setTimeout(
      () => {
        setText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : current.slice(0, prev.length + 1),
        );
      },
      isDeleting ? 45 : 90,
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, phrases]);

  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 flex flex-wrap items-center">
      {/* {baseText} */}
      <span className="text-[#F28D00]">{text}</span>
      <span className="ml-1 inline-block w-[3px] h-[1em] bg-[#F28D00] animate-blink" />
    </h1>
  );
}