const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
const themeToggleLightText = document.getElementById("theme-toggle-light-text");
const themeToggleDarkText = document.getElementById("theme-toggle-dark-text");

// Change the icons inside the button based on the current theme
function setThemeIcon() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    themeToggleLightIcon.style.display = "block";
    themeToggleLightText.style.display = "block";
    themeToggleDarkIcon.style.display = "none";
    themeToggleDarkText.style.display = "none";
  } else {
    themeToggleDarkIcon.style.display = "block";
    themeToggleDarkText.style.display = "block";
    themeToggleLightIcon.style.display = "none";
    themeToggleLightText.style.display = "none";
  }
}

// Set the initial icon when the page loads
setThemeIcon();

themeToggleBtn.addEventListener("click", () => {
  // toggle the theme and update the icon
  if (localStorage.theme === "dark") {
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
  } else {
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
  }
  setThemeIcon();
});
