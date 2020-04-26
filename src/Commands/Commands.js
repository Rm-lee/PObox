import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SearchAndFilter from "../Utils/SearchAndFilter";
import "./command.css";
import { List, Icon } from "semantic-ui-react";
import SidePanelInfo from "../Utils/SidePanelInfo";
function Commands(props) {
  const itemStyle = {
    color: "#333"
  };
  const [command, setCommand] = useState("");
  const [visible, setVisible] = useState(false);
  const [updatedCommandList, setUpdatedList] = useState(props.commands);

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
      >
        <List
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
        </List>
      </SidePanelInfo>
    </>
  );
}

function mapStateToProps(state) {
  return {
    commands: state.commands
  };
}
const mapDispatchToProps = {};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Commands)
);
