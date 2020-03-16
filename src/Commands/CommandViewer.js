import React from 'react';
import Styled from 'styled-components'
import {Icon,Popup} from 'semantic-ui-react'
const CommandDescription = Styled.div`
max-width:99%;
overflow-wrap: break-word;
overflow-y:scroll;
`

const Terminal = Styled.div`
width:100%;
position:absolute;
bottom:0;
background:#333333;
color:#06fc02;
height:120px;
font-size:1.1rem;
letter-spacing:1px;
padding: 10px 10px;
display:flex;
flex-direction:column;
align-content:space-evenly:

`
//onmouseover change color of icon

function CommandViewer(props) {
  console.log(props)
  const userString = `user@System:~/$  `
  function copyCommandToCliboard(){
  navigator.clipboard.writeText(props.command.command)
}
  return (
    <>
    <Terminal >
    {props.command &&
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <div style={{display:"flex"}}><p style={{fontSize:"1.1rem",color:"#97C48F"}}>{userString}</p> <p style={{ marginLeft:"10px"}}>{props.command.command}</p></div>

    <Popup content="Copy" position='left center' trigger={
       <Icon onClick={() => {copyCommandToCliboard()}}style={{marginRight:"10px"}} name='copy' color="olive" />
      } basic />
    </div>
    }
    <CommandDescription><p >{props.command.description}</p></CommandDescription>
    </Terminal>
    
    </>
  );
}
export default CommandViewer