import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Grid, Header, Menu, Popup, Segment } from "semantic-ui-react";
import Styled from "styled-components";
import { deleteProj, setCurrentProject } from "../Actions/index";
import ProjectApps from "../Apps/ProjectApps";
import ProjectBookmarks from "../Bookmarks/ProjectBookmarks";
import CommandViewer from "../Commands/CommandViewer";
import ProjectCommands from "../Commands/ProjectCommands";
import ProjectFiles from "../Files/ProjectFiles";
import { dragIn } from "../Utils/DragnDrop";
import ProjSettings from "./ProjSettings";
import "./settings.css";
//import { Link, } from "react-router-dom"
import Todo from "./Todo";

const HeaderBar = Styled.div`
display:flex;
justify-content:space-between;
background:lightgrey;
align-items:center;
margin-top:0;
padding-top:0;
`;

function Project(props) {
  const [settings, setSettings] = useState(false);
  const [project1, setProject1] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [fileName, setFileName] = useState();
  let crumbs = props.location.pathname.split("/");
  const [activeItem, setActiveItem] = useState("Apps");
  const [view, setView] = useState();
  const [commandInViewer, setCommandInViewer] = useState("");

  useEffect(() => {
    if (!props.projects) {
      props.history.push("/");
    } else {
      setProject1(
        props.projects.find(obj => obj.name === props.match.params.name)
      );
      props.setCurrentProject(
        props.projects.find(obj => obj.name === props.match.params.name)
      );

      return () => {
        props.setCurrentProject(null);
      };
    }
  }, [props.projects]);

  const dragRef = useRef();
  useEffect(() => {
    if (dragRef.current !== null)
      dragIn(dragRef.current, setFileName, setModalOpen);
  }, []);

  useEffect(() => {
    switch (activeItem) {
      case "Apps":
        setView(<ProjectApps obj={project1} />);
        break;
      case "Bookmarks":
        setView(<ProjectBookmarks obj={project1} />);
        break;
      case "Commands":
        setView(
          <ProjectCommands obj={project1} setCommand={setCommandInViewer} />
        );
        break;
      case "Files":
        setView(<ProjectFiles obj={project1} />);
        break;
      case "Todo":
        setView(<Todo projId={project1.id} />);
        break;

      default:
    }
  }, [activeItem, project1]);
  const openCloseSettings = () => {
    setSettings(!settings);
  };
  const handleActive = (e, { name }) => {
    if (name === "Settings") {
      openCloseSettings();
    } else {
      setActiveItem(name);
    }
  };
  const deleteThisProject = ID => {
    props.deleteProj(ID);
    props.history.push("/projects");
  };
  console.log(settings);
  return (
    <>
      {project1 && (
        <div
          style={{
            padding: "5px 10px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Header style={{ color: "#335577" }} as="h2">
              {project1.name}
            </Header>
            <Popup
              style={{ fontSize: ".8rem" }}
              content={project1.project_path}
              trigger={<p>{project1.project_path.substring(0, 35) + "..."}</p>}
              basic
            />
          </div>
        </div>
      )}
      <ProjSettings
        close={openCloseSettings}
        deleteThisProject={deleteThisProject}
        project={project1}
        visible={settings}
      />
      <Grid style={{ height: "330px" }}>
        <Grid.Column width={5}>
          <Menu fluid vertical tabular>
            <Menu.Item
              style={{ fontSize: "1.2rem" }}
              name="Apps"
              active={activeItem === "Apps"}
              onClick={handleActive}
            />

            <Menu.Item
              style={{ fontSize: "1.2rem" }}
              name="Bookmarks"
              active={activeItem === "Bookmarks"}
              onClick={handleActive}
            />

            <Menu.Item
              style={{ fontSize: "1.2rem" }}
              name="Commands"
              active={activeItem === "Commands"}
              onClick={handleActive}
            />
            <Menu.Item
              style={{ fontSize: "1.2rem" }}
              name="Files"
              active={activeItem === "Files"}
              onClick={handleActive}
            />
            <Menu.Item
              style={{ fontSize: "1.2rem" }}
              name="Todo"
              active={activeItem === "Todo"}
              onClick={handleActive}
            />
            <Menu.Item
              style={{ fontSize: "1.2rem" }}
              name="Settings"
              active={activeItem === "Settings"}
              onClick={handleActive}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={11} style={{ paddingLeft: "0" }}>
          <Segment>{view}</Segment>
        </Grid.Column>
      </Grid>
      <ProjSettings close={openCloseSettings} visible={settings} />
      {/* </HalfDiv> */}
      {activeItem === "Commands" ? (
        <CommandViewer command={commandInViewer} />
      ) : null}
    </>
  );
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
    bookmarks: state.bookmarks
  };
}
const mapDispatchToProps = {
  deleteProj: deleteProj,
  setCurrentProject: setCurrentProject
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Project)
);
