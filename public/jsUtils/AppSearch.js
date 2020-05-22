class App_Search_Func {
  constructor() {
    this.execCommand = function(cmd) {
      return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
          resolve(stdout);
        });
      });
    };
  }
}
module.exports = {
  App_Search_Func
};
