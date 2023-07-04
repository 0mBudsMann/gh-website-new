const toggleTheme = (e) => {
  const isDark = !e.target.checked;
  const root = document.querySelector(":root");
  if (isDark) {
    root.style.setProperty("--bg", "#01010F");
    root.style.setProperty("--text", "#fdfdff");
    root.style.setProperty("--yellow", "#F4E36E");
    root.style.setProperty("--pink", "#F0B1BB");
    root.style.setProperty("--green", "#65B27B");
  } else {
    root.style.setProperty("--bg", "#fdfdff");
    root.style.setProperty("--text", "#01010F");
    root.style.setProperty("--yellow", "#E6C242");
    root.style.setProperty("--pink", "#E8546B");
    root.style.setProperty("--green", "#41A45E");
  }
};

document.getElementById("theme-switch").addEventListener("change", toggleTheme);
