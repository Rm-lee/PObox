import React, { useEffect, useState } from "react";
import {
  Divider,
  Dropdown,
  Form,
  Header,
  Icon,
  Input,
  List
} from "semantic-ui-react";
import { filterCategory, getUnique } from "./Utilities";
function SearchAndFilter(props) {
  const ListStyle = {
    width: "100%",
    paddingTop: "15px",
    marginBottom: "0"
  };
  const [options, setOptions] = useState([]);
  const [searchTerm, setTerm] = useState("");
  const dropChange = (event, { value }) => {
    props.setUpdatedList(
      getUnique(
        props.arr.filter(word =>
          word.category.toLowerCase().includes(event.target.textContent)
        ),
        "name"
      )
    );
    if (event.target.textContent === "none") {
      props.setUpdatedList(getUnique(props.arr, "name"));
    }
  };
  useEffect(() => {
    if (props.arr) {
      setOptions(filterCategory(props.arr));
    }
  }, [props.arr]);
  function nameSearch(e, term, list) {
    props.setUpdatedList(
      getUnique(
        list.filter(word =>
          word.name.toLowerCase().includes(term.toLowerCase())
        ),
        "name"
      )
    );
  }
  function searchChange(e) {
    const value = e.target.value;
    setTerm(value);
  }

  return (
    <List style={ListStyle} selection verticalAlign="middle" size="big">
      <div>
        <Form
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "90%"
          }}
          onSubmit={e => {
            e.preventDefault();
            nameSearch(e, searchTerm, props.arr);
          }}
        >
          <Dropdown
            search
            selection
            searchInput={{ type: "text" }}
            options={options}
            placeholder="Category"
            onChange={dropChange}
            style={{ width: "40%" }}
          />
          <Input
            type="text"
            style={{ width: "40%" }}
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
      </div>
      <Divider horizontal style={{ marginBottom: "0" }}>
        <Header as="h4">{props.pageName}</Header>
      </Divider>
    </List>
  );
}
export default SearchAndFilter;
