import React from "react";
import { Route, Link } from "react-router-dom";
import Styled from "styled-components";
// import {useEffect, useState} from 'react'
import Tabs from "./UIElements/Tabs";
import Projects from "./Projects/Projects";
import Project from "./Projects/Project";
import Commands from "./Commands/Commands";
import Snippets from "./Snippets/Snippets";
import Bookmarks from "./Bookmarks/Bookmarks";
import Files from "./Files/Files";
const TrayContainer = Styled.div`
width:100%;
display:flex;
flex-direction:column;
`;

const Tray = () => {
  return (
    <TrayContainer>
      <Tabs />
      <div style={{ marginTop: "70px" }}>
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/bookmarks" component={Bookmarks} />
        <Route exact path="/commands" component={Commands} />
        <Route exact path="/snippets" component={Snippets} />
        <Route exact path="/projects/:name" component={Project} />
        <Route exact path="/files" component={Files} />
      </div>
    </TrayContainer>
  );
};

export default Tray;
