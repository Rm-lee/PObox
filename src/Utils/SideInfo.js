import React, { useEffect } from "react";
import { Header, Icon, List, Table, Button, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { getLinkedProjects } from "../Actions/addFileActions";
import "./Table.css";
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
    <>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {objData.map((data, i) => (
            <Table.Row>
              <Table.Cell>{data.key}</Table.Cell>
              <Table.Cell>{data.value}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Header>Linked to Projects</Header>
      <Label.Group color="blue">
        {props.linkedprojects &&
          props.linkedprojects.map(proj => (
            <Label>
              {props.projects[proj.project_id].name}
              <Icon name="close" />
            </Label>
          ))}
      </Label.Group>
    </>
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
