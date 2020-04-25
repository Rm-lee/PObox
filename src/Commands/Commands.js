import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SearchAndFilter from "../Utils/SearchAndFilter";
import "./command.css";
import { List, Icon } from "semantic-ui-react";
import SidePanelInfo from "../Utils/SidePanelInfo";
function Commands(props) {
  const ListStyle = {
    width: "100%",
    paddingTop: "15px"
  };
  const itemStyle = {
    background: "lightgrey"
  };
  const [command, setCommand] = useState("");
  const [visible, setVisible] = useState(false);
  const [updatedCommandList, setUpdatedList] = useState(props.commands);

  function copyCommandToCliboard(com) {
    navigator.clipboard.writeText(com);
  }

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
        type={"file"}
        data={command}
      >
        <List style={{ minHeight: "72vh" }}>
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
                <Icon
                  style={{ marginRight: "10px" }}
                  name="code"
                  size="small"
                  color="teal"
                />
                <List.Header>{command.name}</List.Header>
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
