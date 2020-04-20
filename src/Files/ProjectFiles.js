import React, { useState, useRef, useEffect } from "react";
import { dragIn } from "../Utils/DragnDrop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { List, Divider, Icon, Dropdown, Popup } from "semantic-ui-react";
import { openUrl } from "../Actions/index";
import AddFilesModal from "./AddFilesModal";

function ProjectFiles(props) {
  const ListStyle = {
    width: "90%"
  };
  const itemStyle = {
    display: "flex"
  };
  const [filePath, setFilePath] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [projFiles, setProjFiles] = useState();
  const dragFRef = useRef();

  const openLink = url => {
    props.openUrl(url);
  };
  console.log(props);

  useEffect(() => {
    console.log(props.files);
    setProjFiles(props.files.filter(el => el.project_id === props.obj.id));
  }, [props.files]);

  useEffect(() => {
    if (dragFRef.current !== null)
      dragIn(dragFRef.current, setFilePath, setModalOpen, false);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <List id="drag-file-here" style={ListStyle} ref={dragFRef}>
        <AddFilesModal
          noProj={false}
          projID={props.obj.id}
          popup="New File"
          name={"New File"}
          updateModalopen={setModalOpen}
          filepath={filePath}
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
        {projFiles &&
          projFiles.map((file, index) => (
            <>
              <List.Item
                onClick={() => {
                  openLink(file.url);
                }}
                key={file.id}
                style={{ fontSize: "1.1rem" }}
              >
                <List.Content
                  style={{
                    color: "#333333",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Popup
                    content={file.name}
                    trigger={
                      <p style={{ margin: 0 }}>
                        {file.name.length > 25
                          ? file.name.substring(0, 24) + "..."
                          : file.name}
                      </p>
                    }
                    basic
                    inverted
                  />{" "}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "30%"
                    }}
                  >
                    <Icon
                      name={file.launch ? "circle" : "ban"}
                      color={file.launch ? "green" : "red"}
                    />
                    <Dropdown icon={{ name: "setting", fontSize: "1.2rem" }}>
                      <Dropdown.Menu direction="left">
                        <Dropdown.Item
                          text="Launch"
                          onClick={() => openLink(file.file_path)}
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </List.Content>
              </List.Item>
              <Divider style={{ margin: "5px 0" }}></Divider>
            </>
          ))}
      </List>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    files: state.files
  };
}
const mapDispatchToProps = {
  openUrl: openUrl
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectFiles)
);
