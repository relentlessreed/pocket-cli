const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const packageJsonPath = path.join(__dirname, "package.json");
let packageJson;

fs.readFile(packageJsonPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading package.json:", err);
    return;
  }
  packageJson = JSON.parse(data);

  app.get("/version", (req, res) => {
    res.json({ version: packageJson.version });
  });
});

app.get("/increment-version", (req, res) => {
  const currentVersion = packageJson.version.split(".");
  const updatedVersion = [
    currentVersion[0],
    currentVersion[1],
    parseInt(currentVersion[2]) + 1,
  ].join(".");

  packageJson.version = updatedVersion;

  fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), (err) => {
    if (err) {
      console.error("Error updating package.json:", err);
      res.status(500).send("Error updating package.json");
      return;
    }
    console.log("Released v" + updatedVersion + " (updatedVersion)");
    console.log("https://pocket-cli.herokuapp.com deployed to Heroku");
    res.send("Version incremented successfully");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
