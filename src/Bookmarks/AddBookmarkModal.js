import React from 'react'
import { Button, Modal, Form, List, Icon, Popup } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import {addBookMarkToProj,getAllBookMarks,addBookMark} from '../Actions/bookmarkActions'
import {withRouter} from 'react-router-dom'
import {connect } from "react-redux"
import Styled from 'styled-components'


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

const ipc = window.require('electron').ipcRenderer
const AddBookmarkModal = (props) => {
    const [bookMarkObj, setBookMarkObj] = useState({
        url:"",
        name:"",
        description:"",
        category:"",
        project_id:props.projID
    })

    const addBookMark = () => {
        const {url,name,description,category} = bookMarkObj
        const noProjBookObj = {url,name,description,category}

        if(props.noProj) { 
            props.addBookMark(noProjBookObj)
            handleClose();
        }else{console.log("this on fired on add bookmark modal")
             props.addBookMarkToProj(bookMarkObj);


             handleClose();
            }

            


        
    }
    const handleClose = () => {
        props.updateModalopen(false)
        setBookMarkObj({
            ...bookMarkObj,
            url:""
        })
    }

    
    const handleOpen = () => props.updateModalopen(true)

    function bookmarkChange(e) {
        const value = e.target.value;
        setBookMarkObj({
            ...bookMarkObj,
            [e.target.name]: value
        });
    }
    useEffect(() => {
        if (!bookMarkObj.url && props.filepath) {
            setBookMarkObj({
                ...bookMarkObj,
                url: props.filepath
            })
        }
    }, [props.filepath])

    // ipc.on('proj-selected', function (event, arg) {
    //     setProjectObj({
    //         ...projectObj,
    //         project_path:arg
    //     })
    // })

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
                <Modal.Header>Add Bookmark Url</Modal.Header>
                <Modal.Content >
                    <Form>
                        <Form.Field>
                            <label>Bookmark Name</label>
                            <input 
                            placeholder='Name'
                            onChange={bookmarkChange}
                            name="name" />
                            
                        </Form.Field>
                        <Form.Field>
                            <label>Url</label>
                            <div >
                                <input style={{ width: "80%" }}
                                    placeholder='Location'
                                    value={bookMarkObj.url}
                                    onChange={bookmarkChange}
                                    name="url"
                                />
                               
                            </div>

                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <input 
                            placeholder='Description'
                            onChange={bookmarkChange}
                            name="description" />
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <input 
                            placeholder='Category'
                            onChange={bookmarkChange}
                            name="category" />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Button style={{ float: "right" }} onClick={handleClose} color="red">Cancel</Button>
                <Button style={{ float: "right" }} onClick={() => { addBookMark() }} color="green">Add Bookmark</Button>
            </Modal>
        )
    }
}
// props.addBookMark(projectObj)
  const mapDispatchToProps = {
    addBookMarkToProj:addBookMarkToProj,
    addBookMark:addBookMark,
    
  }
export default withRouter(
    connect(
   null,
   mapDispatchToProps
  )(AddBookmarkModal)
  )