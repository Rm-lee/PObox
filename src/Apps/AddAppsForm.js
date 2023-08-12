import React, { useState } from "react";
import { Divider, Form, Icon, Input } from "semantic-ui-react";

function AddAppsForm(props) {
  const [searchTerm, setTerm] = useState("");

  function searchChange(e) {
    const value = e.target.value;
    setTerm(value);
  }
  return (
    <div style={{ width: "100%" }}>
      <Form
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          margin: " "
        }}
        onSubmit={e => {
          console.log(searchTerm)
          e.preventDefault();
          props.appSearch(e, searchTerm);
        }}
      >
        <Input
          type="text"
          style={{ width: "90%" }}
          size="mini"
          icon={
            <button
              style={{ background: "transparent", border: "none" }}
              type="submit"
            >
              <Icon name="search" inverted circular link />
            </button>
          }
          name="search"
          placeholder="Search..."
          onChange={searchChange}
        />
      </Form>
      <Divider></Divider>
    </div>
  );
}
export default AddAppsForm;
