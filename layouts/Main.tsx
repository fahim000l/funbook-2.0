import * as React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  Divider,
  Button,
} from "@mui/material";
import NavBar from "../components/Main/NavBar";
import {
  People,
  PersonAdd,
  Groups,
  Feed,
  Message,
  Notifications,
  Logout,
} from "@mui/icons-material";
import Menu from "@/components/tools/Menu";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactNode;
  window?: () => Window;
}

export default function Main(props: Props) {
  const { logOut } = React.useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const personalOptions = [
    {
      icon: <Feed />,
      text: "News Feed",
      path: "/",
    },
    {
      icon: <Message />,
      text: "Messages",
      path: "/messages",
    },
    {
      icon: <Notifications />,
      text: "Notifications",
      path: "/notifications",
    },
  ];

  const socialOptions = [
    {
      icon: <People />,
      text: "Friends",
      path: "/friends",
    },
    {
      icon: <PersonAdd />,
      text: "Friend Requests",
      path: "/friend-requests",
    },
    {
      icon: <Groups />,
      text: "People",
      path: "/people",
    },
  ];

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar />
          <Divider />
          <Menu menuArray={personalOptions} />
          <Divider />
          <Menu menuArray={socialOptions} />
          <Divider />
          <Button onClick={logOut} startIcon={<Logout />}>
            Log Out
          </Button>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Toolbar />
          <Divider />
          <Menu menuArray={personalOptions} />
          <Divider />
          <Menu menuArray={socialOptions} />
          <Divider />
          <Button onClick={logOut} startIcon={<Logout />}>
            Log Out
          </Button>
        </Drawer>
      </Box>
      <Box component="main" className="w-full">
        <Toolbar />
        <div className="lg:p-10 p-2 w-full">{children}</div>
      </Box>
    </Box>
  );
}
