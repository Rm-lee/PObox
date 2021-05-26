import React from "react";
import { Icon, Popup } from "semantic-ui-react";
import Styled from "styled-components";
const CommandDescription = Styled.div`
max-width:99%;
overflow-wrap: break-word;
overflow-y:scroll;
`;

const Terminal = Styled.div`
width:70%;
position:absolute;
bottom:0;
right:0;
background:#333333;
color:#06fc02;
height:125px;
font-size:1.1rem;
letter-spacing:1px;
padding: 10px 10px;
display:flex;
flex-direction:column;
align-content:space-evenly;
border-radius:2px;

`;
//onmouseover change color of icon

function CommandViewer(props) {
  function copyCommandToCliboard() {
    navigator.clipboard.writeText(props.command.command);
  }
  return (
    <>
      <Terminal>
        {props.command && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>{props.command.command}</p>

            <Popup
              content="Copy"
              position="left center"
              trigger={
                <Icon
                  onClick={() => {
                    copyCommandToCliboard();
                  }}
                  style={{ marginRight: "10px" }}
                  name="copy"
                  color="olive"
                />
              }
              basic
            />
          </div>
        )}
        <CommandDescription style={{ color: "white" }}>
          <p>{props.command.description}</p>
        </CommandDescription>
      </Terminal>
    </>
  );
}
export default CommandViewer;
