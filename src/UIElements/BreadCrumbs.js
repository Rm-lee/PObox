import React from "react";
import { Link } from "react-router-dom";

function BreadCrumbs(props) {
  const Fragment = React.Fragment;
  let routes = [];
  let newRoute = "";
  props.crumbs.forEach((path, index) => {
    newRoute += `${path}/`;

    routes.push(newRoute);
  });

  return (
    <>
      <div className="ui breadcrumb">
        {props.crumbs.map(
          (name, index) =>
            name && (
              <Fragment key={name}>
                <i key={name} className="right angle icon divider"></i>
                <Link
                  style={{ fontSize: "1.2rem" }}
                  key={routes[index]}
                  to={routes[index]}
                >
                  {name}
                </Link>
              </Fragment>
            )
        )}
      </div>
    </>
  );
}
export default BreadCrumbs;
