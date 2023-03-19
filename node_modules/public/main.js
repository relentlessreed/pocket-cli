document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");
  const terminal = document.getElementById("terminal");
  const randomProcess = document.getElementById("random-process");
  const loadingBar = document.getElementById("loadingBar");
  const filler = document.getElementById("filler");
  const flashingText = document.getElementById("flashing-text");
  const nowLoadingText = document.getElementById("now-loading-text");

  let loading = 0;
  let loadingFinished = false;

  console.log("Script loaded");

  // Display the splash screen with loading bar and random process string
  displaySplashScreen();

  function updateLoadingBar() {
    const loadingPercent = parseFloat(loadingBar.style.width);

    let increase;

    if (loadingPercent < 64) {
      increase = 1; // Increase by 1% before 64%
    } else {
      increase = 5; // Increase by 5% after reaching 64%
    }

    // updateLoadingBar was using setInterval. It created an infinite loop
    // setTimeout(() => {
    //   const interval = setInterval(updateLoadingBar, 1000); // Adjust the time interval if needed
    // }, 0);

    // setTimeout(() => {
    //     const interval = setInterval(updateLoadingBar, 1000); // Adjust the time interval if needed
    //   }, 0);

    const newLoadingPercent = loadingPercent + increase;

    // pulling all instances of loadingLabel out since we don't need them
    // const loadingLabel = document.getElementById("loadingLabel");

    // if (loadingLabel) {
    //   loadingLabel.innerText = getRandomProcess();
    // }

    loadingBar.style.width = newLoadingPercent + "%";
    randomProcess.innerHTML = `<span style="color: lime;">${window.getRandomProcess()}</span>`; // Update the random process text without .exe and with styling
    // document.getElementById("loadingLabel").innerText =
    //   window.getRandomProcess();

    filler.textContent = "|".repeat(Math.floor(loading));
    const processPhrase = getRandomProcess();
    randomProcess.innerHTML = `<span style="color: lime;">${window.getRandomProcess()}</span>`; // Update the random process text without .exe and with styling  }

    const loadingInterval = setInterval(updateLoadingBar, 1000);
  }

  function showTerminal() {
    terminal.style.display = "block";
    terminal.textContent = "Type your command here";
    terminal.classList.add("flashing-text");
  }

  const hideSplashScreen = () => {
    splashScreen.style.display = "none";
    splashScreen.removeEventListener("click", hideSplashScreen);
    setTimeout(showTerminal, 500);
    terminal.focus();
  };

  splashScreen.addEventListener("click", hideSplashScreen);

  terminal.addEventListener("keydown", (e) => {
    if (!terminal.classList.contains("user-started-typing")) {
      terminal.textContent = "";
      terminal.classList.add("user-started-typing");
    }

    if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      e.stopPropagation();
      terminal.textContent = "";
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(terminal.firstChild, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      if (terminal.firstChild) {
        range.setStart(terminal.firstChild, 0);
      } else {
        range.setStart(terminal, 0);
      }

      return;
    }

    // Handle Terminal Input
    terminal.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        // Execute command
        console.log(terminal.textContent);
        terminal.innerHTML += "<br>Type your command here";
      } else if (e.key === "Backspace") {
        let text = terminal.textContent;
        if (text.slice(-19) === "Type your command here") {
          e.preventDefault();
        }
      } else {
        let text = terminal.textContent;
        if (text.slice(-19) === "Type your command here") {
          terminal.textContent = text.slice(0, -19);
        }
      }
    });

    // Cursor blinking effect
    terminal.addEventListener("blur", () => {
      terminal.classList.remove("flashing");
    });

    terminal.addEventListener("focus", () => {
      terminal.classList.add("flashing");
    });
  });

  function processCommand(input) {
    // Add the rest of the processCommand function and other event listeners here
  }
});
