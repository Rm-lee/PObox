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
import { deleteCommand } from "../Actions/index";
import { deleteBookMark } from "../Actions/bookmarkActions";
import { deleteFile } from "../Actions/addFileActions";

function SidePanelInfo(props) {
  const [activeItem, setActiveItem] = useState("Info");
  const [view, setView] = useState("Info");
  const handleActive = (e, { tag }) => {
    setActiveItem(tag);
  };

  const deleteItem = e => {
    if (props.type === "command") {
      props.deleteCommand(props.data.command_id);
      props.setVisible(false);
    }
    if (props.type === "bookmark") {
      props.deleteBookMark(props.data.id);
      props.setVisible(false);
    }
    if (props.type === "file") {
      props.deleteFile(props.data.file_id);
      props.setVisible(false);
    }
  };
  useEffect(() => {
    switch (activeItem) {
      case "Edit":
        setView(
          <SideEdit
            setDataObj={props.setDataObj}
            data={props.data}
            type={props.type}
          />
        );
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
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "calc(100% / 4)"
                }}
                as="a"
                name="Info"
                active={activeItem === "Info"}
                onClick={handleActive}
                tag="Info"
              >
                Info
              </Menu.Item>
              <Menu.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "calc(100% / 4)"
                }}
                as="a"
                name="Edit"
                active={activeItem === "Edit"}
                onClick={handleActive}
                tag="Edit"
              >
                Edit
              </Menu.Item>
              <Menu.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "calc(100% / 4)"
                }}
                as="a"
                name="Launch"
                active={activeItem === "Launch"}
                onClick={() => {
                  if (props.type === "file") {
                    props.openUrl(props.data.file_path);
                  }
                  if (props.type === "bookmark") {
                    props.openUrl(props.data.url);
                  }
                }}
                tag="Launch"
              >
                Launch
              </Menu.Item>
              <Menu.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: "red",
                  width: "calc(100% / 4)"
                }}
                as="a"
                name="Delete"
                active={activeItem === "Delete"}
                onClick={deleteItem}
                tag="Delete"
              >
                Delete
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
  openUrl: openUrl,
  deleteFile,
  deleteCommand,
  deleteBookMark
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SidePanelInfo)
);
