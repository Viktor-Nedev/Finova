import { useMemo } from "react";

export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.55}s`,
        duration: `${1.8 + Math.random() * 1.6}s`,
        color: ["#16A34A", "#FBBF24", "#58CC02", "#1CB0F6", "#FF4B4B"][index % 5],
        rotate: `${Math.random() * 360}deg`,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            backgroundColor: piece.color,
            rotate: piece.rotate,
          }}
        />
      ))}
    </div>
  );
}
