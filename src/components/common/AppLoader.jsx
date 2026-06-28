import { Box, CircularProgress } from "@mui/material";

function AppLoader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="300px"
    >
      <CircularProgress />
    </Box>
  );
}

export default AppLoader;