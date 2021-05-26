import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Divider, Icon, List } from "semantic-ui-react";
import Styled from "styled-components";
import {
  addCommandToProj,
  deleteCommand,
  getAllCommands
} from "../Actions/index";
import { dragIn } from "../Utils/DragnDrop";
import AddCommandModal from "./addCommandModal";

const StyledDeleteIcon = Styled(Icon)`
float:right;
padding-right:5px;
&:hover{
    
    transform-origin:center;
    transform:scale(1.2)
}

`;
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
                    <StyledDeleteIcon
                      color="red"
                      name="delete"
                      onClick={e => {
                        e.stopPropagation();
                        props.deleteCommand(command.id);
                      }}
                    />{" "}
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
  addCommandToProj: addCommandToProj,
  deleteCommand: deleteCommand
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectCommands)
);
