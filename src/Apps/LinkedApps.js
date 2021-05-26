import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Divider, Dropdown, Icon, List } from "semantic-ui-react";
import {
  deleteApp,
  launchAppInDir,
  launchAppSolo,
  updateApp
} from "../Actions/index";
function LinkedApps(props) {
  const [LinkedApps, setLinkedApps] = useState();

  const appSoloLaunch = app => {
    props.launchAppSolo(app);
  };
  const setLaunch = app => {
    const appData = {
      app_path: app.app_path,
      launch: true,
      name: app.name
    };

    props.updateApp(app.id, appData);
  };
  const disableLaunch = app => {
    const appData = {
      app_path: app.app_path,
      launch: false,
      name: app.name
    };

    props.updateApp(app.id, appData);
  };
  const deleteApp = app => {
    props.deleteApp(app.id);
  };
  const appDirLaunch = app => {
    props.launchAppInDir(app, props.projPath);
  };

  useEffect(() => {
    setLinkedApps(props.apps.filter(el => el.project_id === props.pID));
  }, [props.apps]);

  return (
    <>
      <Divider></Divider>
      <List
        selection
        style={{
          overflowY: "scroll",
          minHeight: "300px",
          maxHeight: "300px",
          width: "100%"
        }}
      >
        {LinkedApps &&
          LinkedApps.map((app, index) => (
            <>
              <List.Item
                key={app.id}
                style={{ fontSize: "1.2rem", marginLeft: "0" }}
                onClick={() => {
                  props.launchAppSolo(app);
                }}
              >
                <List.Content
                  style={{
                    color: "#333333",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  {app.name}
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <Icon
                      name={app.launch ? "circle" : "ban"}
                      color={app.launch ? "green" : "red"}
                    />
                    <Dropdown icon={{ name: "setting", fontSize: "1.2rem" }}>
                      <Dropdown.Menu direction="left">
                        <Dropdown.Item
                          text="Set Auto Launch"
                          onClick={() => setLaunch(app)}
                        />
                        <Dropdown.Item
                          text="Disable Auto Launch"
                          onClick={() => disableLaunch(app)}
                        />

                        <Dropdown.Item
                          text="Remove"
                          onClick={() => deleteApp(app)}
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </List.Content>
              </List.Item>
              <Divider></Divider>
            </>
          ))}
      </List>
    </>
  );
}
function mapStateToProps(state) {
  return {
    apps: state.apps
  };
}
const mapDispatchToProps = {
  deleteApp: deleteApp,
  updateApp: updateApp,
  launchAppSolo: launchAppSolo,
  launchAppInDir: launchAppInDir
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LinkedApps)
);
