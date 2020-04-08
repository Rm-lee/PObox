import React, { useState, useRef, useEffect } from "react";
import { dragIn } from "../Utils/DragnDrop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { List } from "semantic-ui-react";
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
    setProjFiles(props.files.filter(el => el.project_id === props.obj.id));
  }, [props.files]);

  useEffect(() => {
    if (dragFRef.current !== null)
      dragIn(dragFRef.current, setFilePath, setModalOpen, false);
  }, []);

  return (
    <List id="drag-file-here" ref={dragFRef}>
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
