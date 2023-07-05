import gsap from "gsap";

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

function navEnterLink(e) {
  gsap.to("#nav-thumb", {
    duration: 0.7,
    width: e.target.clientWidth,
    ease: "elastic.out(1, 0.7)",
    left: e.target.offsetLeft,
  });
}

function navResetThumb() {
  let active = document.querySelector("#nav-list li.active");
  gsap.to("#nav-thumb", {
    duration: 0.7,
    width: active.clientWidth,
    ease: "elastic.out(1, 0.7)",
    left: active.offsetLeft,
  });
}

document.querySelectorAll("#nav-list li").forEach((link) => {
  link.addEventListener("mouseenter", navEnterLink);
  link.addEventListener("mouseleave", navResetThumb);
});

function onLoad() {
  navResetThumb();
}

window.addEventListener("load", onLoad);
