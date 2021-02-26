import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Styled from "styled-components";
import { openUrl } from "../Actions/index";
import { getUnique } from "../Utils/Utilities";
import SidePanelInfo from "../Utils/SidePanelInfo";
import SearchAndFilter from "../Utils/SearchAndFilter";
import "./File.css";
import { Image, Icon } from "semantic-ui-react";
const FileContainer = Styled.div`
    display:flex;
    flex-direction:column;
    padding:10px;
    border-radius:2px;
    align-items:center;
    justify-content:center;
    width:90px;
    overflow-wrap: break-word;
    align-content:center;
    min-height:90px;    
    &:hover{
        cursor:pointer;
    }
`;
function Files(props) {
  const [file, setFile] = useState("");
  const [visible, setVisible] = useState(false);
  const [shortName, setShortName] = useState(true);
  const [updatedFileList, setUpdatedList] = useState(
    props.files ? getUnique(props.files, "name") : null
  );

  useEffect(() => {
    setUpdatedList(getUnique(props.files, "name"));
  }, [props.files]);
  const iconOptions = {
    png: "file image outline",
    pdf: "file pdf outline",
    txt: "file text outlie",
    jpg: "file image outline",
    JPG: "file image outline",
    jpeg: "file image outline",
    mov: "file video",
    mp4: "file video",
    flv: "file video",
    avi: "file video"
  };

  function nameShorten(id, contName, fName) {
    const tagFileName = document.querySelector(`#${id}`);
    const fileCont = document.querySelector(`#${contName}`);
    fileCont.classList.remove("fileContainer");
    tagFileName.innerHTML =
      fName.length > 9 ? fName.substring(0, 8) + "..." : fName;
    tagFileName.style.color = "#333";
  }
  function displayFullName(id, contName, fName) {
    const tagFileName = document.querySelector(`#${id}`);
    const fileCont = document.querySelector(`#${contName}`);
    fileCont.classList.add("fileContainer");
    tagFileName.innerHTML =
      fName.length > 9 ? fName.substring(0, 8) + "..." : fName;
    tagFileName.style.color = "white";
  }
  return (
    <>
      <SearchAndFilter
        pageName={"Files"}
        arr={props.files}
        setUpdatedList={setUpdatedList}
      />
      <SidePanelInfo
        visible={visible}
        setVisible={setVisible}
        type={"file"}
        data={file}
        setFile={setFile}
      >
        <div style={{ minHeight: "72vh" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap"
            }}
          >
            {updatedFileList &&
              updatedFileList.map((file, i) => (
                <FileContainer
                  onClick={() => {
                    //props.openUrl(file.file_path)
                    setVisible(true);
                    setFile(file);
                  }}
                  id={"container" + i}
                  className="fileContainer"
                  key={file.name}
                  data-hover={file.name}
                  onMouseEnter={() => {
                    displayFullName("file" + i, "container" + i, file.name);
                  }}
                  onMouseLeave={() => {
                    nameShorten("file" + i, "container" + i, file.name);
                  }}
                >
                  {iconOptions[
                    file.name.slice(file.name.lastIndexOf(".") + 1)
                  ] == "file image outline" ? (
                    <Image src={file.file_path} />
                  ) : (
                    <Icon
                      size="big"
                      color="grey"
                      name={
                        iconOptions[
                          file.name.slice(file.name.lastIndexOf(".") + 1)
                        ] || "file"
                      }
                    />
                  )}
                  <p
                    id={"file" + i}
                    style={{
                      textAlign: "center",
                      width: "100%",
                      color: "darkslategrey",
                      fontSize: ".9rem"
                    }}
                  >
                    {shortName && file.name.length > 9
                      ? file.name.substring(0, 8) + "..."
                      : file.name}
                    {!shortName && file.name}
                  </p>
                </FileContainer>
              ))}
          </div>
        </div>
      </SidePanelInfo>
    </>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Files));
