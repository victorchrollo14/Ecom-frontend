import { mainContainer } from "./app.js";
import { disableScroll, enableScroll } from "./app.js";


// variable declarations
const account = document.querySelector('.account');
const cancel = document.querySelector('.cancel');

const loginSection = document.querySelector('.user-reg');
const login = document.querySelector('.login');
const register = document.querySelector('.register');
const loginForm = document.querySelector('.login-form');
const signUpForm = document.querySelector('.register-form');

const productSection = document.querySelector('.products-options-list')
const productsOption = document.querySelector('.collections-name');
const productList = document.querySelector(".product-list-items");

let hasRun = false;
const footer = document.querySelector('.footer');


// Functions

function showLog(e){
    loginSection.classList.remove('-right-80');
    loginSection.classList.add("right-0");
    mainContainer.classList.add("blur");
    disableScroll()
}

function hideLog(e){
    loginSection.classList.remove("right-0");
    loginSection.classList.add("-right-80");
    mainContainer.classList.remove("blur");
    enableScroll()
}

function showLogin(e){
    if(e.target === login){
        loginForm.classList.remove('hidden');
        signUpForm.classList.add('hidden');
        login.classList.remove("text-black");
        login.classList.add("text-slate");   
        register.classList.add('text-black');
        register.classList.remove("text-slate")
    }
    if (e.target === register){
        signUpForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        register.classList.remove('text-black');
        register.classList.add("text-slate");
        login.classList.add("text-black");
        login.classList.remove("text-slate"); 
       
    }
}

// making the product options fixed
function makeCollectionsFixed(e){
        let asideList = ["fixed", "top-64px"];
        const topDistance = productSection.getBoundingClientRect().top;
        const optionWidth = productsOption.clientWidth;
    
        if(!hasRun && topDistance <= 64){
            for (let className of asideList){
                productsOption.classList.add(className);
            }
            
            productList.style.margin = `0 0 0 ${optionWidth+5}px`;
            hasRun = true;
        }
        // console.log(topDistance)
        if(topDistance > 64 || window.innerWidth <= 768){
            for (let className of asideList){
                productsOption.classList.remove(className);
            }
            productList.style.margin = "0";
            hasRun = false;
        }
    
}


const moveCollectionsBottom = () => {
    const bottomDistance = productsOption.getBoundingClientRect().bottom;
    const footerHeight = footer.clientHeight;

    if(footerHeight >= bottomDistance){
        productsOption.classList.remove("top-64px");
        productsOption.style.bottom = `${footerHeight+0.5}px`;
    }
    
}


// Execution
account.addEventListener("click", showLog);
cancel.addEventListener("click", hideLog);

login.addEventListener("click", showLogin);
register.addEventListener("click", showLogin);

if (window.location.pathname === "/HTML/product.html"){
    window.addEventListener('scroll', makeCollectionsFixed);  
    
    let observerOptions = {
        threshold: 1,
        rootMargin: "0px"
    }
    
    window.onload = () => {
        let observer = new IntersectionObserver(moveCollectionsBottom, observerOptions);
        observer.observe(footer);
    }
}


// Exports
export {hideLog, showLog, showLogin}

