import React, { useRef } from "react";
import { Header, Divider, Label, List, Icon, Popup } from "semantic-ui-react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadCrumbs from "../UIElements/BreadCrumbs";
import AddProjectModal from "./AddProjectModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { dragIn } from "../Utils/DragnDrop";
import { launchAppInDir, openUrl } from "../Actions/index";
function Projects(props) {
  const [fileName, setFileName] = useState();

  const IconDiv = Styled.div`
  border-radius:5px;
  padding: 5px;
  z-index:2;
  &hover{
    background:blue;
  }
  `;

  const ListStyle = {
    width: "100%",
    paddingTop: "10px"
  };
  const itemStyle = {
    display: "flex"
  };

  const [modalOpen, setModalOpen] = useState(false);
  const dragRef = useRef();

  useEffect(() => {
    if (dragRef.current !== null)
      dragIn(dragRef.current, setFileName, setModalOpen, false);
  }, []);

  const launchAll = proj => {
    let projectsApps = props.apps.filter(app => app.project_id === proj.id);
    let projectBookMarks = props.bookmarks.filter(
      mark => mark.project_id === proj.id
    );

    projectsApps.forEach(app => {
      if (app.launch) {
        props.launchAppInDir(app, proj.project_path);
      }
    });
    projectBookMarks.forEach(mark => {
      if (mark.launch) {
        props.openUrl(mark.url);
      }
    });
  };
  var date = new Date(Date.now());
  console.log(typeof date);
  return (
    <>
      <List
        popup="test"
        id="drag-file"
        ref={dragRef}
        style={ListStyle}
        itemStyle={itemStyle}
        selection
        verticalAlign="middle"
        size="big"
      >
        <AddProjectModal
          popup="Drop or Click to add"
          name="New Project"
          updateModalopen={setModalOpen}
          filepath={fileName}
          modalOpen={modalOpen}
          itemStyle={itemStyle}
        />
        <Divider horizontal>
          <Header as="h4">
            {/* <Icon name='time' /> */}
            Projects
          </Header>
        </Divider>
        {props.projects &&
          props.projects.map(proj => (
            <List.Item key={proj.name} style={itemStyle}>
              <Link
                style={{ width: "100%", display: "flex" }}
                to={`/projects/${proj.name}`}
              >
                <Icon
                  style={{ marginRight: "10px" }}
                  name="open folder"
                  size="large"
                  color="teal"
                />
                <List.Content>
                  <List.Header> {proj.name} </List.Header>
                </List.Content>
              </Link>
              <IconDiv>
                <Popup
                  content="Launch All Apps and Bookmarks"
                  trigger={
                    <Label
                      content="Start"
                      size="large"
                      color="teal"
                      onClick={e => {
                        launchAll(proj);
                      }}
                    />
                  }
                  basic
                  inverted
                />
              </IconDiv>
            </List.Item>
          ))}
      </List>
    </>
  );
}
function mapStateToProps(state) {
  return {
    projects: state.projects,
    apps: state.apps,
    bookmarks: state.bookmarks
  };
}
const mapDispatchToProps = {
  launchAppInDir: launchAppInDir,
  openUrl: openUrl
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Projects)
);
