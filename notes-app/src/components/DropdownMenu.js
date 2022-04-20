import React from "react"

function DropdownMenu() {

  const DropdownItem = (props) => {
    const itemOnClick = (buttonPressed) => {

      if (buttonPressed === "save") {
        console.log("Saved");
      } else if (buttonPressed === "import") {
        console.log("Imported");
      }
    }

    return (
      <div className="menu-item" onClick={() => itemOnClick(props.buttonName)}>
        {props.leftIcon ? <span className="icon-button">{props.leftIcon}</span> : null}

        {props.children}

        {props.rightIcon ? <span className="icon-right">{props.rightIcon}</span> : null}
      </div>
    )
  }


  return (
    <div className="dropdown">
      <div className="menu">
        <DropdownItem buttonName="save">Save</DropdownItem>
        <DropdownItem buttonName="import">Import</DropdownItem>
      </div>
    </div>
  )
}

export default DropdownMenu;