import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Divider, Icon, Input, List } from "semantic-ui-react";
import Styled from "styled-components";
import { addTodo, deleteTodo, getAllTodos } from "../Actions/index";

const StyledIconDiv = Styled.div`
padding:15px 10px;
margin:0;
&:hover{
color:green;
cursor:pointer;

}

`;
const StyledDeleteIcon = Styled(Icon)`
float:right;
padding-right:5px;
&:hover{
    
    transform-origin:center;
    transform:scale(1.2)
}

`;
const TodoContainer = Styled(List)`
overflow-y:scroll;
max-height:300px;
`;
const Todo = props => {
  const [projTodos, setProjTodos] = useState();
  const [todoObj, setTodoObj] = useState({
    todo: "",
    project_id: props.projId
  });
  useEffect(() => {
    setProjTodos(props.todos.filter(todo => todo.project_id === props.projId));
  }, [props.todos]);

  function todoChange(e) {
    const value = e.target.value;
    setTodoObj({
      ...todoObj,

      [e.target.name]: value
    });
  }

  function addTodo(todoToAdd) {
    props.addTodo(todoToAdd);
  }
  function deleteTodo(id) {
    props.deleteTodo(id);
  }
  return (
    <div style={{ minHeight: "379px", maxHeight: "379px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        <Input
          type="text"
          name="todo"
          placeholder="...add todo"
          onChange={todoChange}
        />
        <StyledIconDiv
          onClick={() => {
            addTodo(todoObj);
          }}
        >
          <Icon size="large" name="plus" />
        </StyledIconDiv>
      </div>
      <Divider></Divider>
      <TodoContainer>
        {projTodos &&
          projTodos.map(todo => (
            <>
              <StyledDeleteIcon
                color="red"
                name="delete"
                onClick={() => {
                  deleteTodo(todo.id);
                }}
              />
              <List.Item
                key={todo.id}
                style={{ fontSize: "1.2rem", paddingLeft: "5px" }}
              >
                <List.Content style={{ color: "#333333" }}>
                  {todo.todo}
                </List.Content>
              </List.Item>
              <Divider></Divider>
            </>
          ))}
      </TodoContainer>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}
const mapDispatchToProps = {
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  deleteTodo: deleteTodo
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Todo));
