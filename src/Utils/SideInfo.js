import React, { useEffect, useState } from "react";
import {
  Header,
  Icon,
  List,
  Image,
  Table,
  Button,
  Label
} from "semantic-ui-react";
import { connect } from "react-redux";
import { getLinkedProjects } from "../Actions/index.js";
import "./Table.css";
function SideInfo(props) {
  useEffect(() => {
    if (props.data.id) {
      props.getLinkedProjects(props.data.id, props.type);
    }
  }, [props.data]);
  let objData = [];
  useEffect(() => {
    for (let [key, value] of Object.entries(props.data)) {
      if (!key.includes("launch") && !key.includes("id")) {
        objData.push({ key, value });
      }
    }
    setObjDataState(objData);
  }, [props.data]);
  const [objDataState, setObjDataState] = useState(objData);

  const [linkedProjectObj, setLinkedProjectObj] = useState([]);

  useEffect(() => {
    let projs = [];
    if (props.linkedprojects) {
      props.linkedprojects.map((proj, i) => {
        let projObj = props.projects.find(obj => obj.id === proj.project_id);
        projs.push(projObj);
        setLinkedProjectObj(projs);
      });
    }
  }, [props.linkedprojects]);
  function copyCommandToCliboard(com) {
    navigator.clipboard.writeText(com);
  }
  return (
    <>
      {props.type === "file" &&
      props.data.name?.slice(props.data.name.lastIndexOf(".") + 1) === "png" ? (
        <Image fluid src={props.data.file_path} />
      ) : null}
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {objDataState.map((data, i) => (
            <Table.Row key={i}>
              <Table.Cell>{data.key}</Table.Cell>
              <Table.Cell
                style={
                  data.key === "command"
                    ? { background: "#333", color: "lightgreen" }
                    : null
                }
              >
                {data.key === "command" && (
                  <Icon
                    name="copy"
                    color="olive"
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={copyCommandToCliboard(data.value)}
                  />
                )}{" "}
                {data.value}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Header>Linked to Projects</Header>
      <Label.Group color="blue">
        {props.linkedprojects &&
          linkedProjectObj.map((proj, i) => (
            <Label key={i}>
              {proj.name}
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
