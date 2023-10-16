import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Avatar,
  InputAdornment,
} from "@mui/material";
import {
  Menu,
  Notifications,
  MessageSharp,
  Search,
  ConnectingAirportsOutlined,
} from "@mui/icons-material";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";

interface props {
  handleDrawerToggle: () => void;
  drawerWidth: Number;
}

const NavBar = ({ handleDrawerToggle, drawerWidth }: props) => {
  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar className="flex justify-between">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <Menu />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="hidden lg:inline"
        >
          Fun Book
        </Typography>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="bg-white rounded-lg w-full lg:w-[60%]"
          size="small"
        />
        <div className="justify-end space-x-2 hidden lg:flex">
          <IconButton className="text-white rounded-full">
            <Avatar className="bg-transparent">
              <Notifications />
            </Avatar>
          </IconButton>
          <IconButton className="text-white rounded-full">
            <Avatar className="bg-transparent">
              {" "}
              <MessageSharp />
            </Avatar>
          </IconButton>
          <IconButton>
            <Avatar src={authUser?.profilePic} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
