import { Box, type BoxProps } from "@mui/material";
import { darken, keyframes } from "@mui/material/styles";
import { toSx } from "@shared/util";
import { type KeyboardEvent, type MouseEvent, type ReactNode, useState } from "react";

/** Module-level keyframes so animation is not redefined per render. */
const spoilerSheen = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    /* Move exactly one period for seamless looping */
    background-position: -100% 0;
  }
`;

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
          cursor: "pointer",
          userSelect: revealed ? "text" : "none",
          ...(revealed
            ? {
                display: "inline-block",
                verticalAlign: "baseline",
                borderRadius: 0.5,
              }
            : {
                /* 2 lines without -webkit-line-clamp (it often still draws "…" despite text-overflow: clip) */
                display: "inline-block",
                maxWidth: "100%",
                maxHeight: "3lh",
                overflow: "hidden",
                verticalAlign: "baseline",
              }),
        },
        ...toSx(sx),
      ]}
      {...rest}
    >
      {revealed ? (
        children
      ) : (
        <Box
          component="span"
          sx={(theme) => {
            const base = theme.palette.grey[700];
            /* Only darken — lighten() made bands “lighter” than the text and letters showed through. */
            const sheenSoft = darken(base, 0.24);
            const sheenMid = darken(base, 0.14);
            return {
              display: "inline",
              minWidth: 0,
              verticalAlign: "baseline",
              /* Invisible on both flat + animated (solid) backgrounds */
              color: "transparent",
              px: 0.15,
              borderRadius: 0.5,
              boxDecorationBreak: "clone",
              WebkitBoxDecorationBreak: "clone",
              bgcolor: "grey.700",
              backgroundImage: `linear-gradient(100deg, ${base} 0%, ${sheenSoft} 42%, ${sheenMid} 50%, ${sheenSoft} 58%, ${base} 100%)`,
              backgroundSize: "200% 100%",
              backgroundRepeat: "repeat-x",
              /* linear + translateZ: smoother than ease-in-out infinite (no "stutter" at repeat) */
              animation: `${spoilerSheen} 7.5s linear alternate infinite`,
              willChange: "background-position",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
                backgroundImage: "none",
              },
            };
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}
