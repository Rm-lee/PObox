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
import SideInfo from "./SideInfo";
function SidePanelInfo(props) {
  const [activeItem, setActiveItem] = useState("Info");
  const [view, setView] = useState("Info");
  const handleActive = (e, { tag }) => {
    setActiveItem(tag);
  };
  useEffect(() => {
    switch (activeItem) {
      case "Info":
        setView(<SideInfo data={props.data} />);
        break;
      case "Projects":
        // setView(<SideProjects data={props.data} />);
        break;

      default:
    }
  }, [activeItem, props.data]);

  return (
    <Sidebar.Pushable>
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
            <Header>{props.data.name}</Header>
          </Segment>
          <Segment.Group>
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
                name="Projects"
                active={activeItem === "Projects"}
                onClick={handleActive}
                tag="Projects"
              >
                Projects
              </Menu.Item>
              <Menu.Item
                style={{ width: "calc(100% / 3)" }}
                as="a"
                name="Launch"
                active={activeItem === "Launch"}
                onClick={handleActive}
                tag="Launch"
              >
                Launch
              </Menu.Item>
            </Menu>
            <Segment style={{ borderTop: "none" }}>{view}</Segment>
          </Segment.Group>
        </Segment.Group>
      </Sidebar>

      <Sidebar.Pusher>{props.children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

export default SidePanelInfo;
