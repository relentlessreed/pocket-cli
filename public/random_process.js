const processPhrases = [
  "Loading the module",
  "Prepping the server for session",
  "Extracting the data",
  "Building packages",
  "Verifying",
  // Added phrases
  "Compiling assets",
  "Deploying to production",
  "Synchronizing databases",
  "Launching virtual machine",
  "Optimizing performance",
  "Encrypting files",
  "Configuring network",
  "Running security scan",
  "Authenticating users",
  "Initializing cache",
  "Starting background tasks",
  "Cleaning temporary files",
  "Resolving dependencies",
  "Opening ports",
  "Checking system requirements",
  "Rendering images",
  "Running unit tests",
  "Uploading media",
  "Establishing connections",
  "Generating logs",
  "Patching vulnerabilities",
  "Scaling infrastructure",
  "Updating configuration",
  "Backing up data",
  "Scheduling tasks",
  "Mapping routes",
  "Monitoring usage",
  "Importing libraries",
  "Validating user input",
  "Setting environment variables",
  "Exporting data",
  "Mounting filesystem",
  "Transcoding videos",
  "Refreshing tokens",
  "Allocating memory",
  "Rebooting services",
  "Migrating servers",
  "Upgrading packages",
  "Reading configuration",
  "Compressing assets",
  "Starting web server",
  "Closing connections",
  "Analyzing queries",
  "Rolling back changes",
  "Implementing feature",
  "Checking compatibility",
  "Creating virtual environment",
  "Processing requests",
  "Restarting application",
  "Sending notifications",
  "Installing plugins",
  "Managing storage",
  "Downloading updates",
  "Establishing SSL",
  "Enabling firewall",
  "Syncing repositories",
  "Cloning project",
  "Starting containers",
  "Debugging issues",
  "Connecting to API",
  "Updating dependencies",
  "Calculating hashes",
  "Deploying hotfix",
  "Writing to disk",
  "Stopping services",
  "Provisioning resources",
  "Recovering data",
  "Initializing database",
  "Managing sessions",
  "Upgrading database",
  "Gathering metrics",
  "Loading resources",
  "Checking disk space",
  "Updating index",
  "Compacting data",
  "Running integration tests",
  "Creating users",
  "Generating reports",
  "Updating certificates",
  "Managing logs",
  "Deleting obsolete files",
  "Purging cache",
  "Encoding audio",
  "Connecting to storage",
  "Setting permissions",
  "Clearing buffers",
  "Updating system",
  "Generating preview",
  "Sending emails",
  "Enabling plugins",
  "Optimizing queries",
  "Creating backups",
  "Implementing authentication",
  "Running scheduled jobs",
  "Building image",
  "Recompiling binaries",
];

window.getRandomProcess = function () {
  const usedPhrases = []; // Add this line
  //   const loadingLabel = document.getElementById("loadingLabel");

  if (usedPhrases.length === processPhrases.length) {
    usedPhrases.length = 0;
  }

  //   if (loadingLabel) {
  //     loadingLabel.innerText = getRandomProcess();
  //   }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * processPhrases.length);
  } while (usedPhrases.includes(randomIndex));

  const selectedProcess = processPhrases[randomIndex];
  usedPhrases.push(randomIndex);
  console.log(selectedProcess);
  return selectedProcess;
};
//   Now, every time a random process is called, it will be logged in the browser console.
