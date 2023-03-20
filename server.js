const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const version = process.env.VERSION;
console.log("Version:", version);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const packageJsonPath = path.join(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

app.get("/version", (req, res) => {
  res.json({ version: packageJson.version });
});

app.get("/increment-version", (req, res) => {
  const currentVersion = packageJson.version.split(".");
  const updatedVersion = [
    currentVersion[0],
    currentVersion[1],
    parseInt(currentVersion[2]) + 1,
  ].join(".");

  packageJson.version = updatedVersion;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("Released v" + updatedVersion + " (updatedVersion)");
  console.log("https://pocket-cli.herokuapp.com deployed to Heroku");
  res.send("Version incremented successfully");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
