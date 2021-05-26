import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  Icon,
  List,
  Modal,
  Popup,
  TextArea
} from "semantic-ui-react";
import Styled from "styled-components";
import { addSnippet } from "../Actions/index";

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
const AddSnippetkModal = props => {
  const [snippetObj, setSnippetObj] = useState({
    snippet: "",
    name: "",
    language: "",
    category: "",
    project_id: props.projID
  });
  const handleClose = () => {
    props.updateModalopen(false);
    setSnippetObj({
      ...snippetObj,
      snippet: ""
    });
  };
  const handleOpen = () => props.updateModalopen(true);

  function snippetChange(e) {
    const value = e.target.value;
    setSnippetObj({
      ...snippetObj,
      [e.target.name]: value
    });
  }
  useEffect(() => {
    if (!snippetObj.snippet && props.filepath) {
      setSnippetObj({
        ...snippetObj,
        snippet: props.filepath
      });
    }
  }, [props.filepath]);

  return (
    <Modal
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
      <Modal.Header>Add Snippet</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Snippet Name</label>
            <input placeholder="Name" onChange={snippetChange} name="name" />
          </Form.Field>
          <Form.Field>
            <label>Snippet</label>
            <div>
              <TextArea
                style={{
                  width: "90%",
                  minHeight: 120,
                  color: "white",
                  backgroundColor: "#333333"
                }}
                placeholder="Snippet"
                value={snippetObj.snippet}
                onChange={snippetChange}
                name="snippet"
              />
            </div>
          </Form.Field>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <Form.Field
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0"
              }}
            >
              <label>Language</label>
              <input
                placeholder="Language"
                onChange={snippetChange}
                name="language"
              />
            </Form.Field>
            <Form.Field
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0"
              }}
            >
              <label>Category</label>
              <input
                placeholder="Category"
                onChange={snippetChange}
                name="category"
              />
            </Form.Field>
          </div>
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
          props.addSnippet(snippetObj);
          handleClose();
        }}
        color="green"
      >
        Add Snippet
      </Button>
    </Modal>
  );
};
// props.addBookMark(projectObj)
const mapDispatchToProps = {
  addSnippet: addSnippet
};
export default withRouter(connect(null, mapDispatchToProps)(AddSnippetkModal));
