import React, { useEffect } from "react";
import { Header, Icon, List, Button, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { getLinkedProjects } from "../Actions/addFileActions";
function SideInfo(props) {
  useEffect(() => {
    if (props.data.id) {
      props.getLinkedProjects(props.data.id);
    }
  }, [props.data]);
  let objData = [];

  for (let [key, value] of Object.entries(props.data)) {
    if (!key.includes("launch") && !key.includes("id")) {
      objData.push({ key, value });
    }
  }

  return (
    <List>
      <Header as="h6">
        <Icon name="info" circular />{" "}
      </Header>
      {objData.map((data, i) => (
        <List.Item style={{ display: "flex", justifyContent: "space-between" }}>
          <List.Header>{data.key}: </List.Header>
          <List.Content>{data.value} </List.Content>
        </List.Item>
      ))}
      <Header>Linked to Projects</Header>
      <Label.Group color="blue">
        {props.linkedprojects &&
          props.linkedprojects.map(proj => (
            <Label as="a">
              {props.projects[proj.project_id].name}
              <Icon name="close" />
            </Label>
          ))}
      </Label.Group>
    </List>
  );
}
function mapStateToProps(state) {
  return {
    linkedprojects: state.linkedProjects,
    projects: state.projects
  };
}
const mapDispatchToProps = {
  getLinkedProjects
};
export default connect(mapStateToProps, mapDispatchToProps)(SideInfo);
