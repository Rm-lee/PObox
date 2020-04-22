import React, { useEffect, useState, useRef } from "react";
import { Input, List, Icon, Button, Divider } from "semantic-ui-react";
import Styled from "styled-components";
import { getAllCommands, addCommandToProj } from "../Actions/index";
import AddCommandModal from "./addCommandModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { dragIn } from "../Utils/DragnDrop";

const itemStyle = {
  display: "flex"
};
const ListStyle = {
  width: "100%"
};
const CommandsContainer = Styled.div`
display:flex;
flex-direction:wrap;
flex-wrap:wrap;
width:100%;
padding:0;
`;
function ProjectCommands(props) {
  const [commandText, setCommandText] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const dragCRef = useRef();
  const Fragment = React.Fragment;
  const [projCommands, setProjCommands] = useState();

  useEffect(() => {
    setProjCommands(
      props.commands.filter(el => el.project_id === props.obj.id)
    );
  }, [props.commands]);
  useEffect(() => {
    if (dragCRef.current !== null)
      dragIn(dragCRef.current, setCommandText, setModalOpen, true);
  }, []);

  return (
    <>
      <CommandsContainer>
        <List
          id="drag-command"
          ref={dragCRef}
          style={ListStyle}
          selection
          verticalAlign="middle"
          size="big"
        >
          <AddCommandModal
            projID={props.obj.id}
            popup="New Command"
            name={"New Command"}
            updateModalopen={setModalOpen}
            droppedText={commandText}
            modalOpen={modalOpen}
            itemStyle={itemStyle}
          />
        </List>
        <Divider style={{ width: "100%", margin: 0 }}></Divider>

        <List
          selection
          verticalAlign="middle"
          style={{
            width: "100%",
            overflowY: "scroll",
            minHeight: "140px",
            maxHeight: "140px"
          }}
        >
          {projCommands &&
            projCommands.map(command => (
              <Fragment key={command.command}>
                <List.Item
                  onClick={() => {
                    props.setCommand(command);
                  }}
                >
                  <Icon name="code" />
                  <List.Content
                    style={{ fontSize: "1.2rem", color: "#333333" }}
                  >
                    {command.name}
                  </List.Content>
                </List.Item>
              </Fragment>
            ))}
        </List>
      </CommandsContainer>
    </>
  );
}

function mapStateToProps(state) {
  return {
    commands: state.commands
  };
}
const mapDispatchToProps = {
  getAllCommands: getAllCommands,
  addCommandToProj: addCommandToProj
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectCommands)
);
