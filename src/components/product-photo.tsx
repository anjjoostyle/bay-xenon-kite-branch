import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductPhoto({
  photos,
  name,
  className,
}: {
  photos: string[];
  name: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const src = photos[index] ?? photos[0];
  const letter = name.trim().slice(0, 1).toUpperCase() || "P";

  if (!src) {
    return (
      <div
        className={cn(
          "flex size-20 shrink-0 items-center justify-center rounded-md bg-secondary font-display text-xl text-primary",
          className,
        )}
        aria-hidden="true"
      >
        {letter}
      </div>
    );
  }

  const frame = (
    <>
      <img src={src} alt="" className="size-full object-cover" />
      {photos.length > 1 ? (
        <span className="absolute right-1 bottom-1 rounded-sm bg-foreground/70 px-1.5 text-xs font-medium text-background">
          {index + 1}/{photos.length}
        </span>
      ) : null}
    </>
  );

  if (photos.length < 2) {
    return (
      <div
        className={cn(
          "relative size-20 shrink-0 overflow-hidden rounded-md bg-secondary",
          className,
        )}
      >
        {frame}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        "relative size-20 shrink-0 overflow-hidden rounded-md bg-secondary",
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        setIndex((current) => (current + 1) % photos.length);
      }}
      aria-label={`Foto de ${name}. Toque para ver a outra.`}
    >
      {frame}
    </button>
  );
}
