import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";

export const toSx = (sx?: SxProps<Theme>) => {
  return Array.isArray(sx) ? sx : sx != null ? [sx] : [];
};
