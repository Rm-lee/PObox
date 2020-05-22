var dbus = require("dbus-native");
const { exec } = require("child_process");
const sysos = os.platform();

//todo
// if login happens close app on gnome<3.36

if (sysos === "linux") {
  if (getDe() === "GNOME") {
    if (gnomeVShouldExitAppLogout()) {
      function loggedin(val) {
        if (val === 0) {
          // app.quit();
        }
      }
      var sessionBus = dbus.sessionBus();
      sessionBus
        .getService("org.gnome.SessionManager")
        .getInterface(
          "/org/gnome/SessionManager/Presence",
          "org.gnome.SessionManager.Presence",
          (err, presence) => {
            // dbus signals
            presence.on("StatusChanged", function() {
              loggedin(arguments[0]);
            });
          }
        );
    }
  }
}

function getDe() {
  exec(
    `env | grep XDG_CURRENT_DESKTOP | cut -d ':' -f 1`,
    (err, stdout, stderr) => {
      if (err) {
        //some err occurred
      } else {
        return stdout;
      }
    }
  );
}
function gnomeVShouldExitAppLogout() {
  exec(`ggnome-shell --version | cut -d " " -f 3`, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
    } else {
      if (stdout < 3.36) {
        return true;
      } else if (stdout >= 3.36) {
        return false;
      }
    }
  });
}
