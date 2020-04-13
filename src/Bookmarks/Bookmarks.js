import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Styled from "styled-components";
import {
  updateBookMark,
  deleteBookMark,
  addBookMark,
  getAllBookMarksNoPid
} from "../Actions/bookmarkActions";
import { filterCategory } from "../Utils/Utilities";
import { openUrl } from "../Actions/index";
import AddBookmarkModal from "./AddBookmarkModal";
import {
  Input,
  Header,
  Divider,
  List,
  Icon,
  Form,
  Popup,
  Dropdown,
  Label,
  Button
} from "semantic-ui-react";
import { dragIn } from "../Utils/DragnDrop";

function Bookmarks(props) {
  let crumbs = props.location.pathname.split("/");
  const ListStyle = {
    width: "100%"
  };
  const itemStyle = {
    // display: "flex",
    // justifyContent: "center"
  };
  const [updatedBookList, setUpdatedBookList] = useState(props.bookmarksNoPid);
  const [searchTerm, setTerm] = useState("");
  const [urlName, setUrlName] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const dragBnonLinkedRef = useRef();
  const [options, setOptions] = useState([]);

  const dropChange = (event, { value }) => {
    setUpdatedBookList(
      props.bookmarksNoPid.filter(word =>
        word.category.toLowerCase().includes(event.target.textContent)
      )
    );
    if (event.target.textContent === "none") {
      setUpdatedBookList(props.bookmarksNoPid);
    }
  };

  function nameSearch(e, term, list) {
    setUpdatedBookList(
      list.filter(word => word.name.toLowerCase().includes(term.toLowerCase()))
    );
  }
  function searchChange(e) {
    const value = e.target.value;
    setTerm(value);
  }

  useEffect(() => {
    if (props.bookmarksNoPid) {
      setOptions(filterCategory(props.bookmarksNoPid));
    }
  }, [props.bookmarksNoPid]);

  const openLink = url => {
    props.openUrl(url);
  };

  useEffect(() => {
    if (dragBnonLinkedRef.current !== null)
      dragIn(dragBnonLinkedRef.current, setUrlName, setModalOpen, true);
  }, []);

  useEffect(() => {
    setUpdatedBookList(props.bookmarksNoPid);
  }, [props.bookmarks, props.bookmarksNoPid]);

  return (
    <>
      <List
        id="drag-bookmark"
        ref={dragBnonLinkedRef}
        style={{
          width: "100%",
          paddingTop: "10px",
          maxHeight: "435px",
          overflowY: "scroll"
        }}
        selection
        verticalAlign="middle"
        size="big"
      >
        <AddBookmarkModal
          noProj={true}
          popup="New BookMark"
          name={"New BookMark"}
          updateModalopen={setModalOpen}
          filepath={urlName}
          modalOpen={modalOpen}
          itemStyle={itemStyle}
        />
        <div>
          <Form
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "95%",
              marginTop: "10px "
            }}
            onSubmit={e => {
              e.preventDefault();
              nameSearch(e, searchTerm, props.bookmarksNoPid);
            }}
          >
            <Dropdown
              search
              selection
              searchInput={{ type: "text" }}
              options={options}
              placeholder="Category"
              onChange={dropChange}
              style={{ width: "40%" }}
            />
            <Input
              type="text"
              style={{ width: "40%" }}
              size="mini"
              icon={
                <button
                  style={{ background: "transparent", border: "none" }}
                  type="submit"
                >
                  <Icon name="search" inverted circular link />
                </button>
              }
              name="search"
              placeholder="Search..."
              onChange={searchChange}
            />
          </Form>
        </div>

        <Divider horizontal>
          <Header as="h4">BookMarks</Header>
        </Divider>
        {updatedBookList &&
          updatedBookList.map(mark => (
            <List.Item style={itemStyle} onClick={() => openLink(mark.url)}>
              <Icon
                style={{ marginRight: "10px" }}
                name="chrome"
                size="large"
                color="teal"
              />
              <List.Content>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <List.Header
                    key={mark.name}
                    style={{ color: "darkslategrey", fontSize: "1.3rem" }}
                  >
                    {mark.name}
                  </List.Header>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "40%",
                      justifyContent: "space-between"
                    }}
                  >
                    <Popup
                      style={{ fontSize: ".8rem" }}
                      content={mark.url}
                      trigger={
                        <p style={{ fontSize: ".9rem" }}>
                          {mark.url.substring(0, 20) + "..."}
                        </p>
                      }
                      basic
                    />
                    <Icon
                      style={{ zIndex: "3" }}
                      onClick={e => {
                        e.stopPropagation();
                        props.deleteBookMark(mark.id);
                      }}
                      color="red"
                      name="close"
                    />
                  </div>
                </div>
              </List.Content>
              <List.Content>
                <List.Description
                  style={{
                    paddingLeft: "45px",
                    width: "100%",
                    fontSize: ".9rem"
                  }}
                >
                  {mark.description}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </>
  );
}

function mapStateToProps(state) {
  return {
    bookmarksNoPid: state.bookmarksNoPid,
    bookmarks: state.bookmarks
  };
}
const mapDispatchToProps = {
  openUrl: openUrl,
  deleteBookMark: deleteBookMark,
  getAllBookMarksNoPid: getAllBookMarksNoPid
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Bookmarks)
);
