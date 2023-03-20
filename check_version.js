const axios = require("axios");
const { exec } = require("child_process");
const packageJson = require("./package.json");

const localVersion = packageJson.version;

const getAppVersion = (url) => {
  return axios
    .get(url + "/version")
    .then((response) => response.data.version)
    .catch((error) => console.error("Error fetching version from", url, error));
};

const getGitVersion = () => {
  return new Promise((resolve, reject) => {
    exec("git show origin/master:package.json", (error, stdout, stderr) => {
      if (error) {
        console.error("Error fetching version from GitHub:", error);
        reject(error);
      } else {
        const gitPackageJson = JSON.parse(stdout);
        resolve(gitPackageJson.version);
      }
    });
  });
};

(async () => {
  const herokuVersion = await getAppVersion("https://pocket-cli.herokuapp.com");
  const gitVersion = await getGitVersion();

  console.log("Local version:", localVersion);
  console.log("Heroku version:", herokuVersion);
  console.log("GitHub version:", gitVersion);

  if (localVersion === herokuVersion && localVersion === gitVersion) {
    console.log("All version numbers are the same!");
  } else {
    console.log("Version numbers are different.");
  }
})();