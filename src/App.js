import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import Styled from "styled-components";
import { getAllFiles } from "./Actions/addFileActions";
import {
  getAllBookMarks,
  getAllBookMarksNoPid
} from "./Actions/bookmarkActions";
import {
  getAllAppsWithPid,
  getAllCommands,
  getAllProjs,
  getAllSnippets,
  getAllTodos
} from "./Actions/index";
import "./App.css";
import Tray from "./Tray";
const Container = Styled.div`
width:100%;
display:flex;
flex-direction:column;


`;

function App(props) {
  useEffect(() => {
    props.getAllProjs();
    props.getAllBookMarks();
    props.getAllCommands();
    props.getAllSnippets();
    props.getAllTodos();
    props.getAllAppsWithPid();
    props.getAllBookMarksNoPid();
    props.getAllFiles();
    props.history.push("/projects");
  }, []);

  return (
    <Container>
      <Route path="/" component={Tray} />
    </Container>
  );
}

const mapDispatchToProps = {
  getAllProjs: getAllProjs,
  getAllBookMarks: getAllBookMarks,
  getAllCommands: getAllCommands,
  getAllSnippets: getAllSnippets,
  getAllTodos: getAllTodos,
  getAllAppsWithPid: getAllAppsWithPid,
  getAllBookMarksNoPid: getAllBookMarksNoPid,
  getAllFiles: getAllFiles
};
export default withRouter(connect(null, mapDispatchToProps)(App));
