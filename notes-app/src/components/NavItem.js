import React, { useState } from "react"

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <button className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </button>

      {open && props.children}

    </li>
  )
}

export default NavItem;