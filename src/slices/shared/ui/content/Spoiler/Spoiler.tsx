import { Box, type BoxProps } from "@mui/material";
import { type KeyboardEvent, type MouseEvent, type ReactNode, useState } from "react";

export type SpoilerProps = Omit<BoxProps<"span">, "onClick" | "children"> & {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
};

export function Spoiler({ children, onClick, sx, ...rest }: SpoilerProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Box
      component="span"
      role="button"
      tabIndex={0}
      aria-expanded={revealed}
      aria-label={revealed ? "Hide text" : "Show text"}
      onClick={(e: MouseEvent<HTMLSpanElement>) => {
        setRevealed((r) => !r);
        onClick?.(e);
      }}
      onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setRevealed((r) => !r);
        }
      }}
      sx={[
        {
          display: "inline",
          cursor: "pointer",
          borderRadius: 0.5,
          userSelect: revealed ? "text" : "none",
          ...(!revealed
            ? {
                bgcolor: "grey.800",
                color: "grey.800",
                px: 0.15,
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
              }
            : {}),
        },
        ...(Array.isArray(sx) ? sx : sx != null ? [sx] : []),
      ]}
      {...rest}
    >
      {children}
    </Box>
  );
}
