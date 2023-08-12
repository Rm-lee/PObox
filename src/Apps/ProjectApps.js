import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";
import Styled from "styled-components";
import { getInstalledApps } from "../Actions/index";
import AddApps from "./AddApps";
import LinkedApps from "./LinkedApps";
const ipc = window.require("electron").ipcRenderer;
const spawn = window.require("child_process").spawn;

const AppsContainer = Styled.div`
display:flex;
flex-direction:wrap;
flex-wrap:wrap;
width:100%;
padding:10px;

`;

function ProjectApps(props) {
  const [activeItem, setActiveItem] = useState();
  const [view, setView] = useState();

  const handleActive = (e, { name }) => {
    setActiveItem(name);
  };

  useEffect(() => {
    if (props.obj) {
      setActiveItem("Apps");
    }
  }, [props.obj]);
  useEffect(() => {
    switch (activeItem) {
      case "Apps":
        setView(
          <LinkedApps projPath={props.obj.project_path} pID={props.obj.id} />
        );
        break;
      case "Add Apps":
        setView(<AddApps pID={props.obj.id} />);
        break;
      default:
    }
  }, [activeItem]);

  return (
    <>
      <Segment style={{ marginBottom: "0", zIndex: "3", padding: "0" }}>
        <Menu
          style={{ justifyContent: "space-around", margin: "0" }}
          tabular
          fluid
          pointing
        >
          <Menu.Item
            style={{ width: "50%" }}
            name="Apps"
            active={activeItem === "Apps"}
            onClick={handleActive}
          />

          <Menu.Item
            style={{ width: "50%", textAlign: "center" }}
            name="Add Apps"
            active={activeItem === "Add Apps"}
            onClick={handleActive}
          />
        </Menu>
      </Segment>

      <AppsContainer>{view}</AppsContainer>
    </>
  );
}
function mapStateToProps(state) {
  return {
    installedApps: state.installedApps
  };
}
const mapDispatchToProps = {
  getInstalledApps: getInstalledApps
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectApps)
);
