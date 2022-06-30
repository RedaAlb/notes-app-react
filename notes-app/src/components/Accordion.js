import React, { createContext, useContext, useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const AccordionContext = createContext();


function Accordion(props) {
  const [showSecondary, setShowSecondary] = useState(false);

  return (
    <div className="accordion">
      <AccordionContext.Provider value={{ showSecondary: showSecondary, setshowSecondary: setShowSecondary, forceOpen: props.forceOpen }}>
        {props.children[0]}                           {/* This is Primary */}
        {showSecondary || props.forceOpen ? (props.children[1]) : null}  {/* This is Secondary */}
      </AccordionContext.Provider>
    </div>
  )
}


function Primary(props) {
  return (
    <div className="accordion-primary" style={{ background: `${props.background}`, borderBottom: `${props.borderBottom}` }}>
      {props.children}
    </div>
  )
}


function Toggle(props) {
  const { showSecondary, setshowSecondary } = useContext(AccordionContext);

  const onToggle = () => {
    setshowSecondary(!showSecondary);
  }


  return (
    props.useToggleButton ? (
      <Stack direction="row">
        <IconButton onClick={onToggle}>
          {showSecondary ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Stack>
    ) : (
      <div onClick={onToggle} className="accordion-toggle">
        {props.children}

        {props.hideToggleIcon ? null : (
          showSecondary ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
        )}
      </div>
    )
  )
}


function Secondary(props) {
  const { setshowSecondary, forceOpen } = useContext(AccordionContext);


  useEffect(() => {
    if (forceOpen) {
      setshowSecondary(true);
    }
  }, [forceOpen, setshowSecondary])


  return (
    <>
      {props.children}
    </>
  )
}


Accordion.Primary = Primary;
Accordion.Primary.Toggle = Toggle;
Accordion.Secondary = Secondary;

export default Accordion;