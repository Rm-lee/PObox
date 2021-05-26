import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { linkFileToProj, updateFile } from "../Actions/addFileActions";
import { updateBookMark } from "../Actions/bookmarkActions";
import { updateCommand } from "../Actions/index";

function SideEdit(props) {
  const [editObj, setEditObj] = useState(props.data);
  const [objDataState, setObjDataState] = useState();
  const [addProjectsArr, setAddProjectsArr] = useState([]);
  let objData = [];
  let projectoptions = [];

  props.projects.forEach((p, i) => {
    projectoptions.push({
      key: p.id,
      text: p.name,
      value: p.id
    });
  });
  useEffect(() => {
    for (let [key, value] of Object.entries(props.data)) {
      if (!key.includes("id")) {
        objData.push({ key, value });
      }
    }
    setObjDataState(objData);
  }, [props.data]);

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
    // should create a function to get file by id and set setFile to that obj, will be more safe...
    props.setDataObj(editObj);
    if (props.type === "file") {
      addProjectsArr.forEach(proj => {
        props.linkFileToProj(props.data.id, proj);
      });
      props.updateFile(props.data.id, editObj);
    } else if (props.type === "command") {
      props.updateCommand(props.data.id, editObj);
    } else if (props.type === "bookmark") {
      props.updateBookMark(props.data.id, editObj);
    }
  }
  return (
    <>
      {editObj && objDataState && props.data && (
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
            {/* <Dropdown
              placeholder="Add to Project"
              fluid
              multiple
              search
              selection
              options={projectoptions}
              onChange={addProjects}
            /> */}
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
  updateFile,
  updateCommand,
  updateBookMark
};
export default connect(mapStateToProps, mapDispatchToProps)(SideEdit);
