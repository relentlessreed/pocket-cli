const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/increment-version", (req, res) => {
  const packageJsonPath = path.join(__dirname, "package.json");

  fs.readFile(packageJsonPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading package.json:", err);
      res.status(500).send("Error reading package.json");
      return;
    }

    const packageJson = JSON.parse(data);
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

      console.log("Updated version:", updatedVersion);
      res.send("Version incremented successfully");
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// This code adds a new route to your server
// (/increment-version) that reads the package.json file,
// increments the version number, and saves the updated file. 
// The GET request sent from the client when the user clicks on 
// the "Increment Version" button triggers this route.

// Note that this code is not suitable for a production
// environment, as it does not provide any security measures
// and may allow unauthorized users to increment the version 
// number. It is recommended to use a more secure and robust
// solution for production applications.