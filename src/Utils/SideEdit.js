import React from "react";
import { Header, Icon, Dropdown, Form, Button } from "semantic-ui-react";
import Project from "../Projects/Project";
import { connect } from "react-redux";
function SideEdit(props) {
  let projectoptions = [];

  props.projects.forEach((p, i) => {
    projectoptions.push({
      key: p.name,
      text: p.name,
      value: p.name
    });
  });

  let objData = [];
  for (let [key, value] of Object.entries(props.data)) {
    if (!key.includes("launch") && !key.includes("id")) {
      objData.push({ key, value });
    }
  }

  return (
    <Form size="small">
      {objData.map((data, i) => (
        <Form.Field
          inline
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <label>{data.key}:</label>
          <input value={data.value} />
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
        />
      </Form.Field>
      <Button color="teal" type="submit">
        Update
      </Button>
    </Form>
  );
}
function mapStateToProps(state) {
  return {
    projects: state.projects
  };
}
export default connect(mapStateToProps, null)(SideEdit);
