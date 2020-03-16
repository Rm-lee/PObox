import React from 'react'
import { Button, Modal, Form, List, Icon, Popup } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import {addProj} from '../Actions/index'
import {withRouter} from 'react-router-dom'
import {connect } from "react-redux"
import Styled from 'styled-components'
const ipc = window.require('electron').ipcRenderer


const DropHere = Styled.div`
width:90%;
display:flex;
padding:5px 0;
flex-direction:column;
border:2px dashed darkgrey;
margin:5px auto;
text-align:center;
justify-content:center;
align-items:center;
background:#eeeeee;
&:hover{
    background:lightgrey;
    cursor:pointer;
}

`
const UnderArrow = Styled.div`
height:5px;
margin-top:5px;
width:50px;
border-bottom:2px solid darkgrey;
border-right:2px solid darkgrey;
border-left:2px solid darkgrey;

`

const AddProjectModal = (props) => {
    const [projectObj, setProjectObj] = useState({
        project_path:"",
        name:"",
        description:""
    })
    const handleClose = () => {
        props.updateModalopen(false)
        setProjectObj({
            ...projectObj,
            project_path:""
        })
    }
    const handleOpen = () => props.updateModalopen(true)
   
    function projectChange(e) {
        const pathFilePicker =  document.querySelector('#project-path-input').value
        const value = e.target.value;
        setProjectObj({
            ...projectObj,
            project_path: pathFilePicker,
            [e.target.name]:value
        })
        
        
    }

    useEffect(() => {
        if (!projectObj.project_path && props.filepath) {
            setProjectObj({
                ...projectObj,
                project_path: props.filepath
            })
        }
    }, [props.filepath])
    
 
    
  

   function submitProject(){
  
    props.addProj(projectObj)
   }

    {
        return (
            <Modal
                open={props.modalOpen}
                onClose={props.modalOpen}

                trigger={
                    <DropHere 
                        onClick={handleOpen}
                       >
                        <Icon name='arrow down' size='small' color="darkgrey" />
                       <UnderArrow />
                        <Popup content={props.popup} trigger={
                             <List.Content>
                            <List.Header   as='h4'> {props.name} </List.Header>
                        </List.Content>
                        } basic />
                       
                    </DropHere>} centered={false}>
                <Modal.Header>Add Project</Modal.Header>
                <Modal.Content >
                    <Form>
                        <Form.Field>
                            <label>Project Name</label>
                            <input 
                            placeholder='Name'
                            onChange={projectChange}
                            name="name" />
                            
                        </Form.Field>
                        <Form.Field>
                            <label>Location</label>
                            <div >
                                <input id="project-path-input" style={{ width: "80%" }}
                                    placeholder='Location'
                                    value={projectObj.project_path}
                                    onChange={projectChange}
                                    name="project_path"
                                />
                                <Button
                                    onClick={() => {
                                        window.postMessage({
                                            type: 'select-dirs'
                                        });
                                    
                                    }}>
                                    Choose Project
                                    </Button>
                            </div>

                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <input 
                            placeholder='Description'
                            onChange={projectChange}
                            name="description" />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Button style={{ float: "right" }} onClick={handleClose} color="red">Cancel</Button>
                <Button style={{ float: "right" }} onClick={() => {submitProject(); handleClose(); console.log(projectObj)}} color="green">Add Project</Button>
            </Modal>
        )
    }
}

  const mapDispatchToProps = {
  addProj:addProj
  }
export default withRouter(
    connect(
   null,
   mapDispatchToProps
  )(AddProjectModal)
  )