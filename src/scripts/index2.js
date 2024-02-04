import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import SplitType from "split-type";

let links = document.querySelectorAll(".navbar a");
let background = document.querySelector(".navbar .link-background");

// console.log(links)
const clickHandler = (el) => {
  links.forEach((link) => {
    link.classList.remove("active");
  });
  el.classList.add("active");
};
links.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Update background position
    background.style.transform = `translateX(${113.95 * index}%)`;
    clickHandler(e.currentTarget);
  });
});

const hamBurger = document.querySelector('.hamburger');
hamBurger.addEventListener('click', () => {
  const siblingHam = document.querySelector('.hamSibling');
  siblingHam.classList.toggle('open');
})
