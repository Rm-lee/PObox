import React, { useState, useEffect, useRef } from "react";
import {
  Header,
  Divider,
  List,
  Icon,
  Popup,
  Label,
  Dropdown
} from "semantic-ui-react";
import BreadCrumbs from "../UIElements/BreadCrumbs";
import { dragIn } from "../Utils/DragnDrop";
import AddBookmarkModal from "../Bookmarks/projectsAddBookmark";
import {
  getAllBookMarks,
  updateBookMark,
  getAllBookMarksNoPid,
  deleteBookMark
} from "../Actions/bookmarkActions";
import { openUrl } from "../Actions/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Styled from "styled-components";

const ProjectBookmarks = props => {
  const ListStyle = {
    width: "90%"
  };
  const itemStyle = {
    display: "flex"
  };
  const setLaunch = mark => {
    const markData = {
      url: mark.url,
      description: mark.description,
      category: mark.category,
      launch: true,
      name: mark.name
    };

    props.updateBookMark(mark.bookmark_id, markData);
  };
  const disableLaunch = mark => {
    const markData = {
      url: mark.url,
      description: mark.description,
      category: mark.category,
      launch: false,
      name: mark.name
    };

    props.updateBookMark(mark.bookmark_id, markData);
  };
  const [urlName, setUrlName] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [projBookmarks, setProjBookmarks] = useState();
  const dragBRef = useRef();
  const openLink = url => {
    props.openUrl(url);
  };
  useEffect(() => {
    setProjBookmarks(
      props.bookmarks.filter(el => el.project_id === props.obj.id)
    );
  }, [props.bookmarks]);

  useEffect(() => {
    if (dragBRef.current !== null)
      dragIn(dragBRef.current, setUrlName, setModalOpen, true);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <List
          id="drag-url"
          ref={dragBRef}
          style={ListStyle}
          selection
          verticalAlign="middle"
          size="big"
        >
          <AddBookmarkModal
            noProj={false}
            projID={props.obj.id}
            popup="New BookMark"
            name={"New BookMark"}
            updateModalopen={setModalOpen}
            filepath={urlName}
            modalOpen={modalOpen}
            itemStyle={itemStyle}
          />
        </List>

        <List
          selection
          style={{
            overflowY: "scroll",
            minHeight: "300px",
            maxHeight: "300px",
            width: "90%",
            paddingTop: "0",
            marginTop: "0"
          }}
        >
          {projBookmarks &&
            projBookmarks.map((mark, index) => (
              <>
                <List.Item
                  onClick={() => {
                    openLink(mark.url);
                  }}
                  key={mark.id}
                  style={{ fontSize: "1.2rem" }}
                >
                  <List.Content
                    style={{
                      color: "#333333",
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    {mark.name}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "30%"
                      }}
                    >
                      <Icon
                        name={mark.launch ? "circle" : "ban"}
                        color={mark.launch ? "green" : "red"}
                      />
                      <Dropdown
                        onClick={() => console.log(mark)}
                        icon={{ name: "setting", fontSize: "1.2rem" }}
                      >
                        <Dropdown.Menu direction="left">
                          <Dropdown.Item
                            text="Set Auto Launch"
                            onClick={() => setLaunch(mark)}
                          />
                          <Dropdown.Item
                            text="Disable Auto Launch"
                            onClick={() => disableLaunch(mark)}
                          />
                          <Dropdown.Item
                            text="Launch"
                            onClick={() => openLink(mark.url)}
                          />
                          <Dropdown.Item
                            text="Delete"
                            onClick={() => {
                              props.deleteBookMark(mark.bookmark_id);
                            }}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </List.Content>
                </List.Item>
                <Divider></Divider>
              </>
            ))}
        </List>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    bookmarks: state.bookmarks
  };
}
const mapDispatchToProps = {
  getAllBookMarks: getAllBookMarks,
  updateBookMark: updateBookMark,
  openUrl: openUrl,
  deleteBookMark: deleteBookMark,
  getAllBookMarksNoPid: getAllBookMarksNoPid
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectBookmarks)
);
