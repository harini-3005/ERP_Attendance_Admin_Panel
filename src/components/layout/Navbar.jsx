import {
  AppBar,
  Toolbar,
  Typography
} from "@mui/material";

const drawerWidth = 240;

function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
  width: `calc(100% - ${drawerWidth}px)`,
  ml: `${drawerWidth}px`,
  backgroundColor: "#1e8fff",
  boxShadow: 3
}}
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          ERP Attendance Admin Panel
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;