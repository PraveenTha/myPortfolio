import { useEffect, useState } from "react";

const RotatingText = ({ texts = [], interval = 2000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!texts.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  if (!texts.length) return null;

  return <span className="rotating-text">{texts[index]}</span>;
};

export default RotatingText;
