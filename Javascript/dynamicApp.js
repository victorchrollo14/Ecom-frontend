import { hideNav } from "./app.js"

const collectionsList = document.querySelectorAll(".collections")
const productWrapper = document.querySelector(".product-list-items")
const productPrototype = document.querySelector(".product-list-item")

let headerImageLink, headerProduct, itemList
let imageSrc, imageHoverSrc, title, subtitle, price
let img1, imgHover, titleEle, subtitleEle, priceEle

// file and path urls
let file = "/product.json"
let path = "product.html"

const showNewPage = async (e) => {
    let item;
    item = (e.type === "load") ? "shirts": e.target.innerHTML.toLowerCase()
        
    try{
        // waiting for data from json file
        let response = await fetch(file)
        let data = await response.json()

        // assigning all the dynamic content
        headerImageLink = data.products[item].headerImageLink
        headerProduct = data.products[item].headerProduct
        itemList = data.products[item].itemList

        // update header
        updateHeader(headerImageLink, headerProduct)
        
        // removing the current products
        removeChildNodes()

        for (let product of itemList){
            imageSrc = product.src
            imageHoverSrc = product.src2
            title = product.title
            subtitle = product.subtitle
            price = product.price
            
            let cloneNode = productPrototype.cloneNode(true)
            
            // child elements that needs to updated.
            img1 = cloneNode.querySelector(".normal-image")
            imgHover = cloneNode.querySelector(".hover-image")
            titleEle = cloneNode.querySelector(".title")
            subtitleEle = cloneNode.querySelector(".subtitle")
            priceEle = cloneNode.querySelector(".price")
            
            // adding attributes and text
            img1.setAttribute("src", imageSrc)
            imgHover.setAttribute("src", imageHoverSrc)
            titleEle.innerHTML = title
            subtitleEle.innerHTML = subtitle
            priceEle.innerHTML = price

            // adding the new product to the list
            productWrapper.appendChild(cloneNode)
            
        }

        
    }
    catch(e){
        console.log(e)
    }
    
}


function removeChildNodes(){
    while(productWrapper.lastElementChild){
        productWrapper.removeChild(productWrapper.lastElementChild)
    }
}


const updateHeader = (link, name) => {
    const headerImage = document.querySelector(".header-image")
    const heading = headerImage.nextElementSibling
    headerImage.setAttribute("src", link)
    heading.innerHTML = name
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// main execution 
collectionsList.forEach((collection) => {
        let items = collection.querySelectorAll('li')
        items.forEach((item) => {
            item.addEventListener("click", showNewPage)
            item.addEventListener("click", hideNav)
            item.addEventListener("click", scrollToTop)
        })
})

console.log(window.location.pathname)
if (window.location.pathname === path){
    window.onload = showNewPage
}


