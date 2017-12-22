const del = require("del");
const childProcess = require("child_process");

function build() {
  del([
    "dist/**/*"
  ]).then(
    () => {
      childProcess.execSync("tsc");
    }
  );
}

build();

module.exports = build;
