import { Box, type BoxProps } from "@mui/material";
import { useAppContext } from "@shared/lib";
import classNames from "classnames";
import C from "./Icon.module.css";

interface IconProps extends BoxProps {
  icon: string;
}

const fontSizeScale = 1;

export function Icon({ icon, className, ...rest }: IconProps) {
  const { icons } = useAppContext();
  const iconEntry = icons[icon];

  if (!iconEntry) {
    return null;
  }

  const { ratio = 1 } = iconEntry;
  const fontSizeRatio = ratio > 1 ? 1 / ratio : ratio;

  return (
    <Box
      className={classNames(C.root, className)}
      component="span"
      display="inline-block"
      {...rest}
    >
      <Box
        component="i"
        className={classNames(C.icon, `icon-${icon}`)}
        sx={{
          fontSize: `${fontSizeRatio * fontSizeScale * 100}%`,
        }}
      />
    </Box>
  );
}
