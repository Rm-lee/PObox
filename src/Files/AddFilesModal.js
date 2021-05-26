import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Icon, List, Modal, Popup } from "semantic-ui-react";
import Styled from "styled-components";
import { addFileToProj } from "../Actions/addFileActions";
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

const AddFilesModal = props => {
  const [fileObj, setFileObj] = useState({
    file_path: "",
    name: "",
    category: "",
    project_id: props.projID
  });

  const addFile = () => {
    let fileName = fileObj.file_path;
    let nameStart;
    if (fileName.lastIndexOf("\\") > -1) {
      nameStart = fileName.lastIndexOf("\\") + 1;
    } else {
      nameStart = fileName.lastIndexOf("/") + 1;
    }
    let name = fileName.slice(nameStart);
    const { file_path, category, project_id } = fileObj;
    const noProjBookObj = { file_path, name, category };

    if (props.noProj) {
      // props.addBookMark(noProjBookObj);
      // handleClose();
    } else {
      props.addFileToProj({ file_path, name, project_id, category });

      handleClose();
    }
  };
  const handleClose = () => {
    props.updateModalopen(false);
    setFileObj({
      ...fileObj,
      file_path: ""
    });
  };

  const handleOpen = () => props.updateModalopen(true);

  function fileChange(e) {
    const value = e.target.value;
    setFileObj({
      ...fileObj,
      [e.target.name]: value
    });
  }
  useEffect(() => {
    if (!fileObj.file_path && props.filepath) {
      setFileObj({
        ...fileObj,
        file_path: props.filepath
      });
    }
  }, [props.filepath]);

  // ipc.on('proj-selected', function (event, arg) {
  //     setProjectObj({
  //         ...projectObj,
  //         project_path:arg
  //     })
  // })

  {
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
        <Modal.Header>Add Resoure</Modal.Header>
        <Modal.Content>
          <Form>
            {/* <Form.Field>
              <label>Name</label>
              <input placeholder="Name" onChange={fileChange} name="name" />
            </Form.Field> */}
            <Form.Field>
              <label>Location</label>
              <div>
                <input
                  style={{ width: "80%" }}
                  placeholder="Location"
                  value={fileObj.file_path}
                  onChange={fileChange}
                  name="file_path"
                />
              </div>
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <input
                placeholder="Category"
                onChange={fileChange}
                name="category"
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Button style={{ float: "right" }} onClick={handleClose} color="red">
          Cancel
        </Button>
        <Button
          style={{ float: "right" }}
          onClick={() => {
            addFile();
          }}
          color="green"
        >
          Add Resource
        </Button>
      </Modal>
    );
  }
};
// props.addBookMark(projectObj)
const mapDispatchToProps = {
  addFileToProj
};
export default connect(null, mapDispatchToProps)(AddFilesModal);
