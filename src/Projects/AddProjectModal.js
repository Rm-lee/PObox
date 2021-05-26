import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form, Icon, List, Modal, Popup } from "semantic-ui-react";
import Styled from "styled-components";
import { addProj } from "../Actions/index";
import { chooseProjectDir } from "../Actions/projectActions";

const ipc = window.require("electron").ipcRenderer;

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

const AddProjectModal = props => {
  const [projectObj, setProjectObj] = useState({
    project_path: "",
    name: "",
    description: ""
  });
  const handleClose = () => {
    props.updateModalopen(false);
    setProjectObj({
      ...projectObj,
      project_path: ""
    });
  };
  const handleOpen = () => props.updateModalopen(true);

  function projectChange(e) {
    const value = e.target.value;
    setProjectObj({
      ...projectObj,
      [e.target.name]: value
    });
  }
  useEffect(() => {
    setProjectObj({
      ...projectObj,
      project_path: props.projDir
    });
  }, [props.projDir]);

  useEffect(() => {
    if (!projectObj.project_path && props.filepath) {
      setProjectObj({
        ...projectObj,
        project_path: props.filepath
      });
    }
  }, [props.filepath]);

  function submitProject() {
    props.addProj(projectObj);
  }

  {
    return (
      <Modal
        open={props.modalOpen}
        onClose={props.modalOpen}
        trigger={
          <Popup
            content={props.popup}
            trigger={
              <DropHere onClick={handleOpen}>
                <Icon name="arrow down" size="small" color="darkgrey" />
                <UnderArrow />

                <List.Content>
                  <List.Header as="h4"> {props.name} </List.Header>
                </List.Content>
              </DropHere>
            }
            basic
          />
        }
        centered={false}
      >
        <Modal.Header>Add Project</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Project Name</label>
              <input placeholder="Name" onChange={projectChange} name="name" />
            </Form.Field>
            <Form.Field>
              <label>Location</label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  id="project-path-input"
                  style={{ width: "60%" }}
                  placeholder="Location"
                  value={projectObj.project_path}
                  onChange={projectChange}
                  name="project_path"
                />
                <Button
                  style={{ width: "25%", height: "40px", fontSize: ".9rem" }}
                  onClick={() => {
                    props.chooseProjectDir();
                  }}
                >
                  File Picker
                </Button>
              </div>
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                placeholder="Description"
                onChange={projectChange}
                name="description"
              />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Button
          style={{ float: "right", margin: "10px" }}
          onClick={handleClose}
          color="red"
        >
          Cancel
        </Button>
        <Button
          style={{ float: "right", margin: "10px" }}
          onClick={() => {
            submitProject();
            handleClose();
            console.log(projectObj);
          }}
          color="teal"
        >
          Add Project
        </Button>
      </Modal>
    );
  }
};
function mapStateToProps(state) {
  return {
    projDir: state.projDir
  };
}
const mapDispatchToProps = {
  addProj: addProj,
  chooseProjectDir: chooseProjectDir
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddProjectModal)
);
