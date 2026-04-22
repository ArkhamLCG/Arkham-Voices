import { Box, type BoxProps } from "@mui/material";

export function Row({ sx, ...rest }: BoxProps) {
  return (
    <Box
      {...rest}
      sx={[
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          minWidth: 0,
          width: 1,
        },
        ...(Array.isArray(sx) ? sx : sx != null ? [sx] : []),
      ]}
    />
  );
}
