import React from "react";
import {
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";

interface props {
  menuArray: { text: String; icon: React.ReactNode; path: any | null }[];
}

const Menu = ({ menuArray }: props) => {
  const { push, pathname } = useRouter();

  return (
    <div>
      <List>
        {menuArray.map((item, index) => (
          <ListItem
            onClick={() => item.path && push(item.path)}
            key={index}
            disablePadding
            className={`font-bold ${
              pathname.includes(item.path) && "text-white bg-[steelblue]"
            }`}
          >
            <ListItemButton>
              <ListItemIcon
                className={`font-bold ${
                  item.path !== "/"
                    ? pathname.includes(item.path) &&
                      "text-white bg-[steelblue]"
                    : item.path === pathname && "text-white bg-[steelblue]"
                }`}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Menu;
