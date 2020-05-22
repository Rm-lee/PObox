import React, { useState, useEffect } from "react";
import { Header, Icon, Dropdown, Form, Button } from "semantic-ui-react";
import Project from "../Projects/Project";
import { linkFileToProj, updateFile } from "../Actions/addFileActions";
import { connect } from "react-redux";

function SideEdit(props) {
  let projectoptions = [];
  props.projects.forEach((p, i) => {
    projectoptions.push({
      key: p.id,
      text: p.name,
      value: p.id
    });
  });
  const [editObj, setEditObj] = useState(props.data);
  let objData = [];
  useEffect(() => {
    for (let [key, value] of Object.entries(props.data)) {
      if (!key.includes("id")) {
        objData.push({ key, value });
      }
    }
    setObjDataState(objData);
  }, [props.data]);

  const [objDataState, setObjDataState] = useState(objData);
  const [addProjectsArr, setAddProjectsArr] = useState([]);
  const addProjects = (e, data) => {
    setAddProjectsArr(data.value);
  };
  function changeHandler(e) {
    setEditObj({
      ...editObj,
      [e.target.name]: e.target.value
    });
  }
  function submitUpdate() {
    if (props.type === "file") {
      addProjectsArr.forEach(proj => {
        props.linkFileToProj(props.data.id, proj);
      });
      props.updateFile(props.data.id, editObj);
    } else if (props.type === "command") {
      alert("setup command update and link to proj");
    }
  }
  return (
    <>
      {editObj && props.data && (
        <Form size="small">
          {objDataState.map((data, i) => (
            <Form.Field
              key={i}
              inline
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <label>{data.key}:</label>
              <input
                name={data.key}
                onChange={changeHandler}
                value={editObj[data.key]}
              />
            </Form.Field>
          ))}
          <Form.Field>
            <Dropdown
              placeholder="Add to Project"
              fluid
              multiple
              search
              selection
              options={projectoptions}
              onChange={addProjects}
            />
          </Form.Field>
          <Button color="teal" onClick={submitUpdate}>
            Update
          </Button>
        </Form>
      )}
    </>
  );
}
function mapStateToProps(state) {
  return {
    projects: state.projects
  };
}
const mapDispatchToProps = {
  linkFileToProj,
  updateFile
};
export default connect(mapStateToProps, mapDispatchToProps)(SideEdit);
