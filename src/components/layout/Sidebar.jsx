import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box
} from "@mui/material";

import {
  Link,
  useLocation
} from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  {
    name: "Supervisor Management",
    path: "/supervisors"
  },
  {
    name: "Leave Types",
    path: "/leave-types"
  },
  {
    name: "Leave Requests",
    path: "/leave-requests"
  },
  {
    name: "Attendance Overview",
    path: "/attendance"
  },
  {
    name: "Corrections",
    path: "/corrections"
  },
  {
    name: "Holiday Management",
    path: "/holidays"
  },
  {
    name: "Reports",
    path: "/reports"
  }
];

function Sidebar() {

  const location =
    useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing:
            "border-box",
          backgroundColor:
            "#1a1a2e",
          color: "#ffffff",
          borderRight:
            "none"
        }
      }}
    >
      <Toolbar />

      <Box
        sx={{
          p: 2,
          textAlign:
            "center"
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#4a90d9"
        >
          ERP Admin
        </Typography>
      </Box>

      <List>

        {menuItems.map(
          (item) => {

            const isActive =
              location.pathname ===
              item.path;

            return (
              <ListItem
                key={item.name}
                disablePadding
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius:
                      2,

                    backgroundColor:
                      isActive
                        ? "#4a90d9"
                        : "transparent",

                    "&:hover": {
                      backgroundColor:
                        "#4a90d9"
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      item.name
                    }
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight:
                        isActive
                          ? 700
                          : 500
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          }
        )}

      </List>
    </Drawer>
  );
}

export default Sidebar;