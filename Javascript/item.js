const carousal = document.querySelector(".carousel");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dropdown = document.querySelector(".dropdown-btn");
const dropContent = document.querySelector(".dropdown-content");
const dropItems = document.querySelector(".drop-list").querySelectorAll("li");
console.log(dropItems);

let timer;
let slideIndex = 0;
let clickCount = 0;
let slides = document.querySelectorAll('.slide');


const showSlides = () =>{
  let i;
  for (i = 0; i <  slides.length; i++){
    if(slides[i].classList.contains("active")){
        slides[i].classList.remove("active");
    }
  
  }
  if(slideIndex === slides.length){
    slideIndex = 0;
  }
  slides[slideIndex].classList.add("active");
  
  slideIndex++;
}

const prevSlide = () => {
    slideIndex -= 2;
    if(slideIndex < 0){
      slideIndex = slides.length - 1;
    }
    showSlides();
}

const nextSlide = () => {
    showSlides();
}

//dropdown functions

function hideDropDown(){
  dropContent.classList.add("hidden");
  dropdown.classList.add("box-shadow");
  dropdown.classList.add("border");
}


const showMenu = (e) =>{
    if(clickCount === 0){
      dropContent.classList.remove("hidden");
      dropdown.classList.remove("box-shadow");
      dropdown.classList.remove("border");
    }
    else {
      hideDropDown();
    }

    clickCount = (clickCount === 0)? 1:0;
}


const changeSize = (e) => {
   dropItems.forEach(item => {
      item.classList.remove("active-size");
   })

   if(e.target.innerHTML !== "SELECT SIZE"){
        let size = e.target.innerHTML;
        e.target.classList.add("active-size");
        dropdown.children[0].innerHTML = size;
        dropContent.classList.add('hidden');
        hideDropDown();
        clickCount = 0;

   }
   
}


// Execution
showSlides();
timer  = setInterval(showSlides, 3000);
carousal.addEventListener("mouseenter", () => {
  clearInterval(timer);
})

carousal.addEventListener("mouseleave", () => {
  timer = setInterval(showSlides, 3000)
})

prev.addEventListener("click", prevSlide);
next.addEventListener("click", nextSlide);


dropdown.addEventListener("click", showMenu);

dropItems.forEach((item) => {
      item.addEventListener("click", changeSize);
})