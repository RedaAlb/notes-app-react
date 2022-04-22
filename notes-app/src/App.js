import React, { useEffect, useState } from "react"
import { child, get } from "firebase/database";

import NavBar from "./components/NavBar";
import Search from "./components/Search";
import NavItem from "./components/NavItem";
import DropdownMenu from "./components/DropdownMenu";
import NotesMainView from "./components/NotesMainView";

import { ReactComponent as ThreeDots } from './icons/three-dots.svg';

import dbRef from "./Firebase";


function App() {

  const [sections, setSections] = useState({});

  const loadSections = () => {
    get(child(dbRef, "/sections/")).then((snapshot) => {
      if (snapshot.exists()) {
        setSections(snapshot.val());
        console.log("Loaded sections");

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    loadSections();
  }, [])


  return (
    <div>

      <NavBar>
        <h1 className="navbar-title">Notes</h1>

        <Search />

        <NavItem icon={<ThreeDots />}>
          <DropdownMenu />
        </NavItem>

      </NavBar>

      <NotesMainView sections={sections} />

    </div>
  );
}

export default App;