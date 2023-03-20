const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const currentVersion = packageJson.version.split('.');
const updatedVersion = [
  currentVersion[0],
  currentVersion[1],
  parseInt(currentVersion[2]) + 1,
].join('.');

packageJson.version = updatedVersion;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Updated package.json version to', updatedVersion);

// OLD "SOLUTION" (build_number.js)

// const fs = require("fs");
// const path = require("path");

// const packageJsonPath = path.join(__dirname, "package.json");

// fs.readFile(packageJsonPath, "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading package.json:", err);
//     return;
//   }

//   const packageJson = JSON.parse(data);
//   const currentVersion = packageJson.version.split(".");
//   const updatedVersion = [
//     currentVersion[0],
//     currentVersion[1],
//     parseInt(currentVersion[2]) + 1,
//   ].join(".");

//   packageJson.version = updatedVersion;

  // fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), (err) => {
  //   if (err) {
  //     console.error("Error updating package.json:", err);
  //     return;
  //   }

  //   console.log("Updated build number:", updatedVersion);
  // });
// });