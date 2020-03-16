import React,{useEffect} from 'react';
import { Label, Popup } from 'semantic-ui-react'
import Styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
const AppsContainer = Styled.div`
display:flex;
flex-direction:wrap;
flex-wrap:wrap;
width:50%;
padding:10px;
`

 function Apps(props) {

useEffect(() => {
    console.log(props.installedApps)
}, [props.installedApps])


  return (
    <>
    <AppsContainer>
     {/* {props.obj.apps.map((file,index) => (
        <Popup key={index}style={{fontSize:".8rem"}}content='Open'  trigger={
     <Label style={{height:"25px"}}as='a' color="teal" content={file} />
    }basic
    inverted />
     ))} */}
     </AppsContainer>
    </>
  );
}
function mapStateToProps(state) {
  return {
    installedApps:state.installedApps
  }
}
const mapDispatchToProps = {

}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Apps)
)