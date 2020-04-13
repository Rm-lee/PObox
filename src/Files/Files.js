import React, { useState, useEffect } from "react";
import BreadCrumbs from "../UIElements/BreadCrumbs";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Styled from "styled-components";
import { filterCategory } from "../Utils/Utilities";
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
    padding:10px;
    border-radius:2px;
    align-items:center;
    justify-content:center;
    width:90px;
    overflow-wrap: break-word;
    align-content:center;
    height:90px;
    &:hover{
        cursor:pointer;
        background:lightgrey;
    }
`;
function Files(props) {
  const [isHidden, setIsHidden] = useState(true);
  let crumbs = props.location.pathname.split("/");
  const ListStyle = {
    width: "100%",
    paddingTop: "15px"
  };

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
      <div style={{ display: "flex", flexDirection: "wrap" }}>
        {updatedCommandList &&
          updatedCommandList.map(file => (
            <FileContainer key={file.name}>
              <Icon size="big" name="file" />

              <p style={{ color: "darkslategrey", fontSize: "1rem" }}>
                {file.name}
              </p>

              <div style={{ display: "flex" }}>
                <p as="h4" style={{ color: "tomato" }}></p>
              </div>
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
