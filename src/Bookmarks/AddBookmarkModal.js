import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form, Icon, Modal, Popup } from "semantic-ui-react";
import Styled from "styled-components";
import { addBookMark, addBookMarkToProj } from "../Actions/bookmarkActions";

const DropHere = Styled.div`
width:95%;
color:green;
margin:10px auto;
&:hover{
    color:white;
    cursor:pointer;
}
& .icon:hover{
  background:green;
  border:none;
}

`;

const AddBookmarkModal = props => {
  const [bookMarkObj, setBookMarkObj] = useState({
    url: "",
    name: "",
    description: "",
    category: "",
    project_id: props.projID
  });

  const addBookMark = () => {
    const { url, name, description, category } = bookMarkObj;
    const noProjBookObj = { url, name, description, category };

    if (props.noProj) {
      props.addBookMark(noProjBookObj);
      handleClose();
    } else {
      props.addBookMarkToProj(bookMarkObj);

      handleClose();
    }
  };
  const handleClose = () => {
    props.updateModalopen(false);
    setBookMarkObj({
      ...bookMarkObj,
      url: ""
    });
  };

  const handleOpen = () => props.updateModalopen(true);

  function bookmarkChange(e) {
    const value = e.target.value;
    setBookMarkObj({
      ...bookMarkObj,
      [e.target.name]: value
    });
  }
  useEffect(() => {
    if (!bookMarkObj.url && props.filepath) {
      setBookMarkObj({
        ...bookMarkObj,
        url: props.filepath
      });
    }
  }, [props.filepath]);

  {
    return (
      <Modal
        open={props.modalOpen}
        onClose={props.modalOpen}
        trigger={
          <DropHere onClick={handleOpen}>
            <Popup
              content={props.popup}
              trigger={
                <Icon
                  style={{ float: "right", boxShadow: "2px 2px 15px #aaa" }}
                  name="plus"
                  circular
                  size="large"
                />
              }
              basic
            />
          </DropHere>
        }
        centered={false}
      >
        <Modal.Header>Add Bookmark Url</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Bookmark Name</label>
              <input placeholder="Name" onChange={bookmarkChange} name="name" />
            </Form.Field>
            <Form.Field>
              <label>Url</label>
              <div>
                <input
                  style={{ width: "80%" }}
                  placeholder="Location"
                  value={bookMarkObj.url}
                  onChange={bookmarkChange}
                  name="url"
                />
              </div>
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                placeholder="Description"
                onChange={bookmarkChange}
                name="description"
              />
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <input
                placeholder="Category"
                onChange={bookmarkChange}
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
            addBookMark();
          }}
          color="green"
        >
          Add Bookmark
        </Button>
      </Modal>
    );
  }
};
// props.addBookMark(projectObj)
const mapDispatchToProps = {
  addBookMarkToProj: addBookMarkToProj,
  addBookMark: addBookMark
};
export default withRouter(connect(null, mapDispatchToProps)(AddBookmarkModal));
