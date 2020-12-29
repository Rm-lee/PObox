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
import { shortenText } from "../Utils/Utilities";
import { openUrl } from "../Actions/index";
import AddBookmarkModal from "./AddBookmarkModal";
import SidePanelInfo from "../Utils/SidePanelInfo";
import SearchAndFilter from "../Utils/SearchAndFilter";
import { Card, Icon } from "semantic-ui-react";
import { dragIn } from "../Utils/DragnDrop";

function Bookmarks(props) {
  const [updatedList, setUpdatedList] = useState(props.bookmarksNoPid);
  const [urlName, setUrlName] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const dragBnonLinkedRef = useRef();

  const openLink = url => {
    props.openUrl(url);
  };

  useEffect(() => {
    setUpdatedList(props.bookmarksNoPid);
  }, [props.bookmarks, props.bookmarksNoPid]);

  const [bookmark, setBookmark] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <>
      <SearchAndFilter
        pageName={"Bookmarks"}
        setUpdatedList={setUpdatedList}
        arr={props.bookmarksNoPid}
      />

      <SidePanelInfo
        visible={visible}
        setVisible={setVisible}
        type={"file"}
        data={bookmark}
      >
        <AddBookmarkModal
          noProj={true}
          popup="New BookMark"
          name={"New BookMark"}
          updateModalopen={setModalOpen}
          filepath={urlName}
          modalOpen={modalOpen}
        />

        <Card.Group stackable style={{ marginTop: "60px" }}>
          {updatedList &&
            updatedList.map((mark, i) => (
              <Card
                style={{
                  boxShadow: "4px 8px 10px #aaa",
                  maxWidth: "80%",
                  margin: "30px auto",
                  borderTopRightRadius: "0",
                  borderTopLeftRadius: "0",
                  borderBottomRadius: "2px"
                }}
              >
                <Card.Content>
                  <Card.Header style={{ color: "#333" }}>
                    <Icon
                      circular
                      inverted
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      color="teal"
                      name="chrome"
                      onClick={() => {
                        openLink(mark.url);
                      }}
                    />
                    {mark.name}
                    <Icon
                      onClick={() => {
                        setBookmark(mark);
                        setVisible(true);
                      }}
                      style={{ float: "right", cursor: "pointer" }}
                      color="grey"
                      name="ellipsis horizontal"
                    />
                  </Card.Header>
                  <Card.Meta>{shortenText(mark.description, 100)}</Card.Meta>
                </Card.Content>
                <Card.Content extra style={{ fontSize: "1.1rem" }}>
                  <p
                    style={{ color: "dodgerblue" }}
                    onClick={() => {
                      openLink(mark.url);
                    }}
                  >
                    {mark.url}{" "}
                  </p>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </SidePanelInfo>
      {/* <List
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
      </List> */}
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
