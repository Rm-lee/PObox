import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Form, Icon, Input, List, Popup } from "semantic-ui-react";
import Styled from "styled-components";
import { deleteSnippet } from "../Actions/index";
import AddSnippetModal from "../Snippets/AddSnippetModal";
import { dragIn } from "../Utils/DragnDrop";
import "./snippet.css";

const CommandDescription = Styled.div`
padding-top:10px;
color:yellow;`;
const ipc = window.require("electron").ipcRenderer;

const SIcon = Styled(Icon)`
color:olive;

`;
const Terminal = Styled.div`
width:100%;
font-size:.9rem;
overflow-y:scroll;
height:200px;
background:rgb(40, 43, 46);
margin:0;
`;

const MarkContainer = Styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;


`;

const Snippets = props => {
  const [updatedSnippetList, setUpdatedSnippetList] = useState(props.snippets);
  const [searchTerm, setTerm] = useState("");
  useEffect(() => {
    setUpdatedSnippetList(props.snippets);
  }, [props.snippets]);
  function nameSearch(e, term, list) {
    setUpdatedSnippetList(
      list.filter(word => word.name.toLowerCase().includes(term.toLowerCase()))
    );
    console.log(updatedSnippetList);
  }
  function searchChange(e) {
    const value = e.target.value;
    setTerm(value);
  }

  function deleteSnippet(id) {
    props.deleteSnippet(id);
  }
  const ListStyle = {
    width: "100%"
  };
  const itemStyle = {
    display: "flex"
  };
  function copyCommandToCliboard(snip) {
    navigator.clipboard.writeText(snip);
  }
  const [snipText, setSnipText] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [snippet, setSnippet] = useState();
  const dragSRef = useRef();
  const Fragment = React.Fragment;

  useEffect(() => {
    if (dragSRef.current !== null)
      dragIn(dragSRef.current, setSnipText, setModalOpen, true);
  }, []);

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
      >
        <List
          id="drag-url"
          ref={dragSRef}
          style={ListStyle}
          selection
          verticalAlign="middle"
          size="big"
        >
          <AddSnippetModal
            popup="New Snippet"
            name="New Snippet"
            updateModalopen={setModalOpen}
            filepath={snipText}
            modalOpen={modalOpen}
            itemStyle={itemStyle}
          />
        </List>

        <div>
          <Form
            style={{
              display: "flex",
              justifyContent: "center",
              width: "90%",
              margin: " "
            }}
            onSubmit={e => {
              e.preventDefault();
              nameSearch(e, searchTerm, props.snippets);
            }}
          >
            <Input
              type="text"
              style={{ width: "90%" }}
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

        <List
          selection
          verticalAlign="middle"
          style={{ height: "142px", overflowY: "scroll" }}
        >
          {updatedSnippetList &&
            updatedSnippetList.map(snippet => (
              <Fragment key={snippet.snippet}>
                <List.Item
                  style={{ fontSize: "1.2rem" }}
                  onClick={() => {
                    setSnippet(snippet);
                  }}
                >
                  <List.Content
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex" }}>
                      <Icon name="code" />
                      <List.Header style={{ marginLeft: "10px" }}>
                        {snippet.name}
                      </List.Header>
                    </div>
                    <Icon
                      color="red"
                      name="delete"
                      onClick={() => {
                        deleteSnippet(snippet.id);
                      }}
                      style={{ padding: "5px" }}
                    />
                  </List.Content>
                </List.Item>
              </Fragment>
            ))}
        </List>
      </div>{" "}
      <Terminal>
        {snippet && (
          <div
            style={{
              display: "flex",
              height: "100%",
              justifyContent: "space-between",
              padding: "0"
            }}
          >
            <SyntaxHighlighter
              className="code-snippet-box"
              language={snippet.language}
              style={obsidian}
            >
              {snippet.snippet}
            </SyntaxHighlighter>{" "}
            <Popup
              content="Copy"
              position="left center"
              trigger={
                <Icon
                  onClick={() => {
                    copyCommandToCliboard(snippet.snippet);
                  }}
                  style={{ position: "relative", top: "0", right: "0" }}
                  name="copy"
                  color="olive"
                />
              }
              basic
            />
          </div>
        )}
      </Terminal>
    </>
  );
};

function mapStateToProps(state) {
  return {
    snippets: state.snippets
  };
}
const mapDispatchToProps = {
  deleteSnippet: deleteSnippet
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Snippets)
);
