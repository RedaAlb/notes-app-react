import React from "react";

import { IconButton, Menu } from "@mui/material";


function OptionsMenu(props) {
  const menuOpen = Boolean(props.menuAnchor);


  return (
    <>
      <IconButton
        onClick={(e) => props.setMenuAnchor(e.currentTarget)}
        size={`${props.btnSize ? props.btnSize : "medium"}`}
      >
        {props.btnContent}
      </IconButton>

      <Menu
        id={props.id}
        PaperProps={{ style: { minWidth: props.minWidth } }}
        anchorEl={props.menuAnchor}
        open={menuOpen}
        onClose={() => props.setMenuAnchor(null)}
        MenuListProps={{ "aria-labelledby": "basic-button", }}
        disableScrollLock={true}
      >
        {props.children}
      </Menu>
    </>
  )
}

export default OptionsMenu;