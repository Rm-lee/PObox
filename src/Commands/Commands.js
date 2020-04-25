import React, { useState, useEffect } from "react";
import BreadCrumbs from "../UIElements/BreadCrumbs";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Styled from "styled-components";
import { filterCategory } from "../Utils/Utilities";
import "./command.css";
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
import addCommandModal from "./addCommandModal";
import SidePanelInfo from "../Utils/SidePanelInfo";
function Commands(props) {
  // let crumbs = props.location.pathname.split("/");
  const ListStyle = {
    width: "100%",
    paddingTop: "15px"
  };
  const itemStyle = {
    background: "lightgrey"
    // display: "flex",
    // justifyContent: "center"
  };
  const [command, setCommand] = useState("");
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [updatedCommandList, setUpdatedCommandList] = useState(props.commands);
  const [searchTerm, setTerm] = useState("");
  const dropChange = (event, { value }) => {
    setUpdatedCommandList(
      props.commands.filter(word =>
        word.category.toLowerCase().includes(event.target.textContent)
      )
    );
    if (event.target.textContent === "none") {
      setUpdatedCommandList(props.commands);
    }
  };
  useEffect(() => {
    if (props.commands) {
      setOptions(filterCategory(props.commands));
    }
  }, [props.bookmarksNoPid]);
  function nameSearch(e, term, list) {
    setUpdatedCommandList(
      list.filter(word => word.name.toLowerCase().includes(term.toLowerCase()))
    );
  }
  function searchChange(e) {
    const value = e.target.value;
    setTerm(value);
  }

  function copyCommandToCliboard(com) {
    navigator.clipboard.writeText(com);
  }
  const hideCommandDiv = id => {
    console.log(id);
    const listItem = document.querySelector(`#${id} > div.commandView`);

    listItem.classList.toggle("show-command-div");
    listItem.classList.toggle("hidden-command-div");
  };
  return (
    <>
      <List style={ListStyle} selection verticalAlign="middle" size="big">
        <div>
          <Form
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "90%",
              margin: " "
            }}
            onSubmit={e => {
              e.preventDefault();
              nameSearch(e, searchTerm, props.commands);
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
          <Header as="h4">Commands</Header>
        </Divider>
        <SidePanelInfo
          visible={visible}
          setVisible={setVisible}
          type={"file"}
          data={command}
        >
          <List style={{ minHeight: "72vh" }}>
            {updatedCommandList &&
              updatedCommandList.map((command, i) => (
                <List.Item
                  key={command.name + i}
                  id={command.category + i}
                  style={itemStyle}
                  onClick={() => {
                    setCommand(command);
                    setVisible(true);
                  }}
                >
                  <Icon
                    style={{ marginRight: "10px" }}
                    name="code"
                    size="small"
                    color="teal"
                  />
                  <List.Header>{command.name}</List.Header>
                </List.Item>
              ))}
          </List>
        </SidePanelInfo>
      </List>
    </>
  );
}

function mapStateToProps(state) {
  return {
    commands: state.commands
  };
}
const mapDispatchToProps = {};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Commands)
);
