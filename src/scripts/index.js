import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

ScrollTrigger.normalizeScroll(true);

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
    ease: "elastic.out(1, 1.7)",
    left: e.target.offsetLeft,
  });
}

function navResetThumb() {
  let active = document.querySelector("#nav-list li.active");
  gsap.to("#nav-thumb", {
    duration: 0.7,
    width: active.clientWidth,
    ease: "elastic.out(1, 1.7)",
    left: active.offsetLeft,
  });
}

document.querySelectorAll("#nav-list li").forEach((link) => {
  link.addEventListener("mouseenter", navEnterLink);
  link.addEventListener("mouseleave", navResetThumb);
});

let sectionHeight = document.getElementById("home").clientHeight;

function sectionAnimations() {
  let sectionColorTimeLine = gsap.timeline();
  let bottombarTimeLine = gsap.timeline();

  sectionColorTimeLine.to(":root", {
    "--primary": () => {
      return window.getComputedStyle(document.body).getPropertyValue("--blue").trim();
    },
    scrollTrigger: {
      trigger: "#home",
      end: "bottom bottom",
      scrub: true,
    },
  });

  bottombarTimeLine.fromTo(
    "#nav-thumb",
    {
      width: () => document.getElementById("nav-home").clientWidth,
      left: () => document.getElementById("nav-home").offsetLeft,
    },
    {
      width: () => document.getElementById("nav-wings").clientWidth,
      left: () => document.getElementById("nav-wings").offsetLeft,
      scrollTrigger: {
        trigger: "#wings",
        end: "bottom bottom",
        scrub: true,
      },
    }
  );

  sectionColorTimeLine.to(
    ":root",
    {
      "--primary": () => {
        return window.getComputedStyle(document.body).getPropertyValue("--yellow").trim();
      },
      scrollTrigger: {
        trigger: "#wings",
        start: 1,
        // end: () => 8 * sectionHeight,
        // start: "top top",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-wings").classList.add("active");
        },
        onLeaveBack: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-home").classList.add("active");
        },
      },
    },
    ">"
  );

  let wingSectionTimeLine = gsap.timeline();

  for (let i = 1; i <= 7; i++) {
    wingSectionTimeLine.fromTo(
      ".pin-wrap",
      {},
      {
        scrollTrigger: {
          scrub: true,
          trigger: "#wings",
          pin: true,
          pinType: "fixed",
          pinSpacing: true,
          start: () => i * sectionHeight,
          end: () => "+=" + sectionHeight,
          snap: {
            snapTo: -1,
            duration: 0.3,
            ease: "power1.inwingsOut",
          },
        },
        rotate: i * -45,
        ease: "power1.inOut",
      }
    );
  }

  sectionColorTimeLine.fromTo(
    ":root",
    {
      "--primary": () => {
        return window.getComputedStyle(document.body).getPropertyValue("--yellow").trim();
      },
    },
    {
      "--primary": () => {
        return window.getComputedStyle(document.body).getPropertyValue("--pink").trim();
      },
      scrollTrigger: {
        trigger: "#coordinators",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-coordinators").classList.add("active");
        },
        onLeaveBack: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-wings").classList.add("active");
        },
      },
    }
  );

  bottombarTimeLine.fromTo(
    "#nav-thumb",
    {
      width: () => document.getElementById("nav-wings").clientWidth,
      left: () => document.getElementById("nav-wings").offsetLeft,
    },
    {
      width: () => document.getElementById("nav-coordinators").clientWidth,
      left: () => document.getElementById("nav-coordinators").offsetLeft,
      scrollTrigger: {
        trigger: "#coordinators",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-coordinators").classList.add("active");
        },
        onLeaveBack: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-wings").classList.add("active");
        },
      },
    }
  );

  let links = gsap.utils.toArray("nav a");
  links.forEach((a) => {
    let element = document.querySelector(a.getAttribute("href"));
    a.addEventListener("click", (e) => {
      e.preventDefault();
      gsap.to(window, {
        duration: 1,
        scrollTo: element.getBoundingClientRect().top + element.offsetTop,
        overwrite: "auto",
      });
    });
  });
}

function onLoad() {
  // sectionHeight = document.getElementById("home").clientHeight;
  navResetThumb();
  sectionAnimations();
}

window.addEventListener("load", onLoad);
window.addEventListener("refresh", () => {
  ScrollTrigger.clearScrollMemory();
  window.history.scrollRestoration = "manual";
});

window.addEventListener("resize", () => {
  // sectionHeight = document.getElementById("home").clientHeight;
});
