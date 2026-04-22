import { Box, type BoxProps } from "@mui/material";
import classNames from "classnames";
import C from "./Icon.module.css";

interface IconProps extends BoxProps {
  icon: string;
}

export function Icon({ icon, className, ...rest }: IconProps) {
  return (
    <Box
      className={classNames(C.root, className)}
      component="span"
      display="inline-block"
      {...rest}
    >
      <Box component="i" className={classNames(C.icon, `icon-${icon}`)} />
    </Box>
  );
}
