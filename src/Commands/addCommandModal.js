import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form, Icon, List, Modal, Popup } from "semantic-ui-react";
import Styled from "styled-components";
import { addCommandToProj } from "../Actions/index";

const DropHere = Styled.div`
width:90%;
display:flex;
padding:5px 0;
flex-direction:column;
border:2px dashed darkgrey;
margin:5px auto;
text-align:center;
justify-content:center;
align-items:center;
background:#eeeeee;
&:hover{
    background:lightgrey;
    cursor:pointer;
}

`;
const UnderArrow = Styled.div`
height:5px;
margin-top:5px;
width:50px;
border-bottom:2px solid darkgrey;
border-right:2px solid darkgrey;
border-left:2px solid darkgrey;

`;

const ipc = window.require("electron").ipcRenderer;
const AddCommandModal = props => {
  const [commandObj, setCommandObj] = useState({
    name: "",
    command: "",
    description: "",
    category: "",
    project_id: props.projID
  });
  const handleClose = () => {
    props.updateModalopen(false);
    setCommandObj({
      ...commandObj,
      command: ""
    });
  };
  const handleOpen = () => props.updateModalopen(true);

  function commandChange(e) {
    const value = e.target.value;
    setCommandObj({
      ...commandObj,
      [e.target.name]: value
    });
  }
  useEffect(() => {
    if (!commandObj.command && props.droppedText) {
      setCommandObj({
        ...commandObj,
        command: props.droppedText
      });
    }
  }, [props.droppedText]);

  // ipc.on('proj-selected', function (event, arg) {
  //     setProjectObj({
  //         ...projectObj,
  //         project_path:arg
  //     })
  // })

  {
    return (
      <Modal
        id="commandModal"
        open={props.modalOpen}
        onClose={props.modalOpen}
        trigger={
          <DropHere onClick={handleOpen}>
            <Icon name="arrow down" size="small" color="darkgrey" />
            <UnderArrow />
            <Popup
              content={props.popup}
              trigger={
                <List.Content>
                  <List.Header as="h4"> {props.name} </List.Header>
                </List.Content>
              }
              basic
            />
          </DropHere>
        }
        centered={false}
      >
        <Modal.Header>Add Command</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Command Name</label>
              <input placeholder="Name" onChange={commandChange} name="name" />
            </Form.Field>
            <Form.Field>
              <label>Command</label>
              <div>
                <input
                  style={{ width: "80%" }}
                  placeholder="Command"
                  value={commandObj.command}
                  onChange={commandChange}
                  name="command"
                />
              </div>
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                placeholder="Description"
                onChange={commandChange}
                name="description"
              />
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <input
                placeholder="Category"
                onChange={commandChange}
                name="category"
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Button style={{ float: "right" }} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          style={{ float: "right", marginBottom: "10px" }}
          onClick={() => {
            props.addCommandToProj(commandObj);
            handleClose();
          }}
          color="green"
        >
          Add Command
        </Button>
      </Modal>
    );
  }
};
// props.addBookMark(projectObj)
const mapDispatchToProps = {
  addCommandToProj: addCommandToProj
};
export default withRouter(connect(null, mapDispatchToProps)(AddCommandModal));
