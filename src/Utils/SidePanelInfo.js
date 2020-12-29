import React, { useState, useEffect } from "react";
import {
  Header,
  Image,
  Icon,
  Button,
  Menu,
  Ref,
  Segment,
  Sidebar
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SideEdit from "./SideEdit";
import SideInfo from "./SideInfo";
import { openUrl } from "../Actions/index";

function SidePanelInfo(props) {
  const [activeItem, setActiveItem] = useState("Info");
  const [view, setView] = useState("Info");
  const handleActive = (e, { tag }) => {
    setActiveItem(tag);
  };
  useEffect(() => {
    switch (activeItem) {
      case "Edit":
        setView(<SideEdit data={props.data} type={props.type} />);
        break;
      case "Info":
        setView(<SideInfo data={props.data} type={props.type} />);
        break;
      // case "Launch":
      //     console.log(props.data.file_path)
      //     props.openUrl(props.data.file_path);

      //   break;
      default:
    }
  }, [activeItem, props.data]);

  return (
    <Sidebar.Pushable style={{ height: "72vh", overflowY: "scroll" }}>
      <Sidebar
        as={Segment}
        animation="scale down"
        icon="labeled"
        direction="right"
        style={{ padding: 0 }}
        onHide={() => props.setVisible(false)}
        vertical
        visible={props.visible}
        width="wide"
      >
        <Segment.Group style={{ padding: "0 auto", background: "white" }}>
          <Segment>
            <Header textAlign="center">{props.data.name}</Header>
          </Segment>
          <Segment.Group style={{ margin: 0, padding: "5px 15px 0" }}>
            <Menu pointing>
              <Menu.Item
                style={{ width: "calc(100% / 3)" }}
                as="a"
                name="Info"
                active={activeItem === "Info"}
                onClick={handleActive}
                tag="Info"
              >
                Info
              </Menu.Item>
              <Menu.Item
                style={{ width: "calc(100% / 3)" }}
                as="a"
                name="Edit"
                active={activeItem === "Edit"}
                onClick={handleActive}
                tag="Edit"
              >
                Edit
              </Menu.Item>
              <Menu.Item
                style={{ width: "calc(100% / 3)" }}
                as="a"
                name="Launch"
                active={activeItem === "Launch"}
                onClick={() => {
                  console.log(props.data.file_path);
                  props.openUrl(props.data.file_path);
                }}
                tag="Launch"
              >
                Launch
              </Menu.Item>
            </Menu>
            <Segment style={{ borderTop: "none", padding: "10px 0" }}>
              {view}
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </Sidebar>

      <Sidebar.Pusher>{props.children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = {
  openUrl: openUrl
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SidePanelInfo)
);
