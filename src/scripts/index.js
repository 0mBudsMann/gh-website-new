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

  sectionColorTimeLine.to(":root", {
    "--primary": () => {
      return window
        .getComputedStyle(document.body)
        .getPropertyValue("--blue")
        .trim();
    },
    scrollTrigger: {
      trigger: "#home",
      end: "bottom bottom",
      scrub: true,
    },
  });

  sectionColorTimeLine.to(
    ":root",
    {
      "--primary": () => {
        return window
          .getComputedStyle(document.body)
          .getPropertyValue("--yellow")
          .trim();
      },
      scrollTrigger: {
        trigger: "#wings",
        start: "bottom bottom",
        end: "top bottom",
        scrub: true,
        onEnter: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-wings").classList.add("active");
        },
        onLeave: () => navResetThumb(),
        onLeaveBack: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-home").classList.add("active");
          navResetThumb();
        },
      },
    },
    ">"
  );

  let wingSectionTimeLine = gsap.timeline();

  for (let i = 1; i <= 7; i++) {
    let currDescElement = document.querySelector(
      `.desc-wrapper p:nth-child(${i})`
    );

    wingSectionTimeLine.fromTo(
      currDescElement,
      {
        rotateX: 0,
        y: 0,
      },
      {
        scrollTrigger: {
          scrub: true,
          trigger: "#wings",
          pinSpacing: true,
          start: () => i * sectionHeight,
          end: () => "+=" + sectionHeight,
          snap: {
            snapTo: -1,
            duration: 0.3,
            ease: "power1.inwingsOut",
          },
        },
        rotateX: 90,
        y: -currDescElement.clientHeight,
        ease: "power1.inOut",
      }
    );

    let nextDescElement = document.querySelector(
      `.desc-wrapper p:nth-child(${i + 1})`
    );

    wingSectionTimeLine.fromTo(
      nextDescElement,
      {
        rotateX: -90,
        y: nextDescElement.clientHeight,
      },
      {
        scrollTrigger: {
          scrub: true,
          trigger: "#wings",
          pinSpacing: true,
          start: () => i * sectionHeight,
          end: () => "+=" + sectionHeight,
          snap: {
            snapTo: -1,
            duration: 0.3,
            ease: "power1.inwingsOut",
          },
        },
        rotateX: 0,
        y: 0,
        ease: "power1.inOut",
      }
    );

    for (let j = i + 2; j <= 8; j++) {
      let descElement = document.querySelector(
        `.desc-wrapper p:nth-child(${j})`
      );

      wingSectionTimeLine.set(descElement, {
        rotateX: -90,
        y: descElement.clientHeight,
      });
    }

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
        return window
          .getComputedStyle(document.body)
          .getPropertyValue("--yellow")
          .trim();
      },
    },
    {
      "--primary": () => {
        return window
          .getComputedStyle(document.body)
          .getPropertyValue("--pink")
          .trim();
      },
      scrollTrigger: {
        trigger: "#coordinators",
        start: "top bottom-=100px",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-coordinators").classList.add("active");
        },
        onLeave: () => navResetThumb(),
        onLeaveBack: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-wings").classList.add("active");
          navResetThumb();
        },
      },
    }
  );

  const personUI = gsap.utils.toArray(".person-container");
  personUI.forEach((person) => {
    gsap.to(person, {
      scrollTrigger: {
        trigger: person,
        start: "top bottom-=10svh",
        end: "+=80svh",
        toggleClass: "active",
      },
    });
  });

  sectionColorTimeLine.fromTo(
    ":root",
    {
      "--primary": () => {
        return window
          .getComputedStyle(document.body)
          .getPropertyValue("--pink")
          .trim();
      },
    },
    {
      "--primary": () => {
        return window
          .getComputedStyle(document.body)
          .getPropertyValue("--green")
          .trim();
      },
      scrollTrigger: {
        trigger: "#connect",
        start: "top bottom-=100px",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-connect").classList.add("active");
        },
        onLeave: () => navResetThumb(),
        onLeaveBack: () => {
          document.querySelector(".active").classList.remove("active");
          document.getElementById("nav-coordinators").classList.add("active");
          navResetThumb();
        },
      },
    }
  );

  let links = gsap.utils.toArray("nav a");
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      gsap.to(window, {
        duration: 1,
        scrollTo: a.getAttribute("href"),
        overwrite: "auto",
      });
    });
  });
}

function onLoad() {
  sectionHeight = document.getElementById("home").clientHeight;
  navResetThumb();
  sectionAnimations();
}

window.addEventListener("load", onLoad);
window.addEventListener("refresh", () => {
  ScrollTrigger.clearScrollMemory();
  window.history.scrollRestoration = "manual";
});

window.addEventListener("resize", () => {
  sectionHeight = document.getElementById("home").clientHeight;
});


//Reducing opacity on scroll
function makeScrollBarTransparent() {
  var navElement = document.querySelector("nav");
  
  //To get the maximum scrollY
  const totalPageHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  // Get the height of the viewport
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // Calculate the maximum scroll value
  const maxScrollY = totalPageHeight - viewportHeight;

  
  if (this.scrollY > maxScrollY*0.05 && this.scrollY < maxScrollY * 0.915)
    navElement.style.opacity = .2;

  else
    navElement.style.opacity = 1;

  console.log(this.scrollY);
}

window.addEventListener("scroll", makeScrollBarTransparent, false);