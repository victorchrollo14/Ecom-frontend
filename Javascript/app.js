import { showLog, hideLog, showLogin } from "./product.js";

const mobileNav = document.querySelector(".mobile-navigation");
const search = mobileNav.querySelector(".search");
const searchSym = search.children[0];
const searchBox = search.children[1];
const shop = mobileNav.querySelector(".shop");
const collections = mobileNav.querySelector(".collections");
const arrowMark = mobileNav.querySelector("svg");
const navBar = document.querySelector(".navbar");
const mainContainer = document.querySelector(".main-container");
let sections = document.querySelectorAll("section:not(.mobile-navigation)");

// account variables
const account = document.querySelector(".account");
const cancel = document.querySelector(".cancel");
const login = document.querySelector(".login");
const register = document.querySelector(".register");

// product navigation
const collectionsList = document
  .querySelector(".collections")
  .querySelectorAll("li");

// path
const path1 = "product.html";
const path2 = "index.html";

// random javascript code
let count = 1;
const initial =
  "Legendary flannels and classical shirts - built from responsibe materials, designed to take on fall, winter and whatever else you throw at them";
function changeContent() {
  if (count == 1) {
    document.querySelector(".para").innerHTML =
      "Comfortable & Funclothing for people who value ournatural resources";
  } else {
    document.querySelector(".para").innerHTML = initial;
  }
  count = count == 1 ? 0 : 1;
}

let dis = 0;

// adding background color to navbar while scrolling.
window.addEventListener("scroll", () => {
  let scrHeight = window.scrollY;
  console.log(scrHeight);
  let header = document.querySelector(".header");
  let logo = document.querySelector("#logo").querySelector("h3");

  if (scrHeight > 200) {
    header.style.background = "black";
    logo.classList.add("gradient-color");
  } else {
    header.style.background = "initial";
    logo.classList.remove("gradient-color");
  }
});

const shopFunction = (e) => {
  if (count == 1) {
    collections.style.display = "block";
    shop.nextElementSibling.style.display = "none";
    shop.nextElementSibling.nextElementSibling.style.display = "none";
    arrowMark.style.transform = "rotate(180deg)";
  } else {
    collections.style.display = "none";
    shop.nextElementSibling.style.display = "initial";
    shop.nextElementSibling.nextElementSibling.style.display = "initial";
    arrowMark.style.transform = "rotate(0deg)";
  }
  count = count == 1 ? 0 : 1;
};

const showNav = (e) => {
  mobileNav.style.right = "0px";
  mainContainer.classList.add("blur");
  disableScroll();
};

function hideNav(e) {
  mobileNav.style.right = "-500px";
  mainContainer.classList.remove("blur");
  searchSym.classList.remove("move-right");
  search.classList.remove("border-effect");
  enableScroll();
}

function disableScroll() {
  document.body.style.height = "100%";
  document.body.style.overflowY = "hidden";
}

function enableScroll() {
  document.body.style.height = "initial";
  document.body.style.overflowY = "initial";
}

// Main execution starts here
searchBox.addEventListener("click", (e) => {
  searchSym.classList.add("move-right");
  search.classList.add("border-effect");
});

sections.forEach((section) => {
  section.addEventListener("click", hideNav);
});

shop.addEventListener("click", shopFunction);
navBar.addEventListener("click", showNav);

account.addEventListener("click", showLog);
cancel.addEventListener("click", hideLog);

login.addEventListener("click", showLogin);
register.addEventListener("click", showLogin);

// exports
export { showNav, hideNav, mainContainer, disableScroll, enableScroll };
