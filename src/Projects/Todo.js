import React, { useState, useEffect, useRef } from 'react';
import { Header, Divider, List, Icon, Popup, Label, Input, Button } from 'semantic-ui-react'
import { getAllTodos, addTodo, deleteTodo } from '../Actions/index'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import Styled from 'styled-components'

const StyledIcon = Styled(Icon)`
&:hover{
    color:green;
}

`
const StyledDeleteIcon = Styled(Icon)`
float:right;
padding-right:5px;
&:hover{
    
    transform-origin:center;
    transform:scale(1.2)
}

`
const TodoContainer = Styled(List)`
overflow-y:scroll;
max-height:300px;
`
const Todo = (props) => {
    const [projTodos, setProjTodos] = useState()
    const [todoObj, setTodoObj] = useState({
        todo: "",
        project_id: props.projId
    })
    useEffect(() => {

        setProjTodos(props.todos.filter(todo => todo.project_id === props.projId))

    }, [props.todos])

    function todoChange(e) {
        const value = e.target.value;
        setTodoObj({
            ...todoObj,

            [e.target.name]: value
        })
    }
    
    function addTodo(todoToAdd) {
        props.addTodo(todoToAdd)
    }
    function deleteTodo(id) {
        props.deleteTodo(id)
    }
    return (
        <div style={{minHeight:"379px",maxHeight:"379px"}}>
            <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                <Input
                    type="text"
                    name="todo"
                    placeholder="...add todo"
                    onChange={todoChange}
                />
                <StyledIcon size="large" name="plus" onClick={() => { addTodo(todoObj) }} />
            </div>
            <Divider></Divider>
            <TodoContainer >
                {projTodos &&
                    projTodos.map(todo => (
                        <><StyledDeleteIcon color="red" name='delete' onClick={() => { deleteTodo(todo.id) }} />
                        <List.Item key={todo.id} style={{ fontSize: "1.2rem",  }}>
                           
                            <List.Content style={{color:"#333333"}}>{todo.todo}</List.Content>
                            
                        </List.Item>
                        <Divider></Divider>
                        </>
                    ))

                }
            </TodoContainer>
        </div>
    );
}





function mapStateToProps(state) {
    return {
        todos: state.todos
    }
}
const mapDispatchToProps = {
    getAllTodos: getAllTodos,
    addTodo: addTodo,
    deleteTodo: deleteTodo
}
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Todo)
)