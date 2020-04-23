import React from "react";
import { Header, Icon, Form, Button } from "semantic-ui-react";

function SideInfo(props) {
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

      <Button color="teal" type="submit">
        Update
      </Button>
    </Form>
  );
}
export default SideInfo;
