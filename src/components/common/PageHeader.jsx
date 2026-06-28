import { Typography } from "@mui/material";

function PageHeader({ title }) {
  return (
    <Typography
      variant="h4"
      fontWeight="bold"
      mb={3}
    >
      {title}
    </Typography>
  );
}

export default PageHeader;