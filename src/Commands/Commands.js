import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Icon, Popup } from "semantic-ui-react";
import { deleteCommand } from "../Actions/index";
import SearchAndFilter from "../Utils/SearchAndFilter";
import SidePanelInfo from "../Utils/SidePanelInfo";
import { shortenText } from "../Utils/Utilities";
import "./command.css";

function Commands(props) {
  const itemStyle = {
    color: "#333"
  };
  const [command, setCommand] = useState("");
  const [visible, setVisible] = useState(false);
  const [updatedCommandList, setUpdatedList] = useState(props.commands);
  function copyCommandToCliboard(command) {
    navigator.clipboard.writeText(command);
  }

  useEffect(() => {
    setUpdatedList(props.commands);
  }, [props.commands]);
  return (
    <>
      <SearchAndFilter
        pageName={"Commands"}
        setUpdatedList={setUpdatedList}
        arr={props.commands}
      />
      <SidePanelInfo
        visible={visible}
        setVisible={setVisible}
        type={"command"}
        data={command}
        setDataObj={setCommand}
      >
        <Card.Group stackable style={{ margin: "10px 0", padding: "10px 0" }}>
          {updatedCommandList &&
            updatedCommandList.map((command, i) => (
              <Card
                style={{
                  boxShadow: "4px 8px 10px #aaa",
                  maxWidth: "80%",
                  margin: "30px auto",
                  borderTopRightRadius: "0",
                  borderTopLeftRadius: "0",
                  borderBottomRadius: "2px"
                }}
              >
                <Card.Content>
                  <Card.Header style={{ color: "#333" }}>
                    <Icon
                      circular
                      inverted
                      style={{ marginRight: "10px" }}
                      color="teal"
                      name="code"
                    />
                    {command.name}
                    <Icon
                      onClick={() => {
                        setCommand(command);
                        setVisible(true);
                      }}
                      style={{ float: "right", cursor: "pointer" }}
                      color="grey"
                      name="ellipsis horizontal"
                    />
                  </Card.Header>
                  <Card.Meta>{shortenText(command.description, 100)}</Card.Meta>
                </Card.Content>
                <Card.Content
                  extra
                  style={{ background: "#333", color: "lightgreen" }}
                >
                  {command.command}
                  <Popup
                    content="Copy"
                    position="left center"
                    trigger={
                      <Icon
                        onClick={() => {
                          copyCommandToCliboard(command.command);
                        }}
                        style={{ marginRight: "10px", float: "right" }}
                        name="copy"
                        color="teal"
                      />
                    }
                    basic
                  />
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
        {/* <List
          selection
          divided
          verticalAlign="middle"
          style={{ minHeight: "72vh" }}
        >
          {updatedCommandList &&
            updatedCommandList.map((command, i) => (
              <List.Item
                key={command.name + i}
                id={command.category + i}
                style={itemStyle}
                onClick={() => {
                  setCommand(command);
                  setVisible(true);
                }}
              >
                <List.Header as="h3">{command.name}</List.Header>
                <List.Content>{command.description}</List.Content>
              </List.Item>
            ))}
        </List> */}
      </SidePanelInfo>
    </>
  );
}

function mapStateToProps(state) {
  return {
    commands: state.commands
  };
}
const mapDispatchToProps = {
  deleteCommand
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Commands)
);
