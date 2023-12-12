import Typography, { TypographyProps } from "@mui/material/Typography";

export const NoContent = (props: TypographyProps) => {
  return <Typography align="center" variant="h5" py={8} {...props} />;
};
