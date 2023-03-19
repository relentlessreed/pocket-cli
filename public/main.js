document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");
  const terminal = document.getElementById("terminal");
  const flashingText = document.getElementById("flashing-text");
  const nowLoadingText = document.getElementById("now-loading-text");
  const filler = document.getElementById("filler");
  let loading = 0;
  let loadingFinished = false;

  console.log("Script loaded");

  function updateLoadingBar() {
    setTimeout(() => {
      loading += Math.random() * 1;
      updateLoadingBar();
    }, 1000 + Math.random() * 2000);

    if (loading >= 100) {
      clearInterval(loadingInterval);
      flashingText.classList.remove("hidden");
      nowLoadingText.classList.add("hidden");
      loadingFinished = true;
      splashScreen.addEventListener("click", hideSplashScreen);
      return;
    }

    filler.textContent = "|".repeat(Math.floor(loading));
  }

  const loadingInterval = setInterval(updateLoadingBar, 1000);

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
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const input = terminal.textContent.trim().split("\n").pop();
      processCommand(input);
    }
  });

  function processCommand(input) {
    // Add the rest of the processCommand function and other event listeners here
  }
});
