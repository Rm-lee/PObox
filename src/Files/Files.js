import React, { useState, useEffect } from "react";
import BreadCrumbs from "../UIElements/BreadCrumbs";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Styled from "styled-components";
import { filterCategory } from "../Utils/Utilities";
import "./File.css";
import {
  Input,
  Header,
  Divider,
  List,
  Icon,
  Form,
  Dropdown,
  Popup,
  Label,
  Button
} from "semantic-ui-react";
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
  const ListStyle = {
    width: "100%",
    paddingTop: "15px"
  };
  const [shortName, setShortName] = useState(true);
  const [options, setOptions] = useState([]);
  const [updatedCommandList, setUpdatedCommandList] = useState(props.files);
  const [searchTerm, setTerm] = useState("");

  const dropChange = (event, { value }) => {
    setUpdatedCommandList(
      props.files.filter(word =>
        word.category.toLowerCase().includes(event.target.textContent)
      )
    );
    if (event.target.textContent === "none") {
      setUpdatedCommandList(props.files);
    }
  };
  useEffect(() => {
    if (props.files) {
      setOptions(filterCategory(props.files));
    }
  }, [props.files]);
  function nameSearch(e, term, list) {
    setUpdatedCommandList(
      list.filter(word => word.name.toLowerCase().includes(term.toLowerCase()))
    );
  }
  function searchChange(e) {
    const value = e.target.value;
    setTerm(value);
  }

  //maybe use onMouseOver to create an after psuedo element to house filename below icon
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
      <List style={ListStyle} selection verticalAlign="middle" size="big">
        <div>
          <Form
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "90%"
            }}
            onSubmit={e => {
              e.preventDefault();
              nameSearch(e, searchTerm, props.files);
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
          <Header as="h4">Files</Header>
        </Divider>
      </List>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {updatedCommandList &&
          updatedCommandList.map((file, i) => (
            <FileContainer
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
              <Icon size="big" color="grey" name="file" />
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
    </>
  );
}

function mapStateToProps(state) {
  return {
    files: state.files
  };
}
const mapDispatchToProps = {};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Files));
