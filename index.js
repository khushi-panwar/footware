//  Fake API data rendering
//  Search
//  Sorting
//  Filtering (category, price range)
//  Slider (price / rating etc.)
//  Like & Unlike

// global variable
const API_URL = "https://dummyjson.com/products/category/mens-shoes";
let allProducts = [];
let filteredProducts = [];
// dom elements
const container = document.querySelector("#product-grid")
const searchInput = document.querySelector("#Item")
const searchIcon = document.querySelector("#searchIcon");


//  Fake API data fetching
async function fetchProduct() {

    try {
        const response = await fetch(API_URL);

        if(!response) return console.log("No data rendered!");
        const data = await response.json();
        // console.log(data); -----------checking
        allProducts = data.products;
        filteredProducts = [...allProducts];
        
        
        renderProduct(filteredProducts);

    } catch (error) {
        console.log("API Error:" + error);
    }
}

fetchProduct();

// render product to card
function renderProduct(products){
    container.innerHTML= ""

    if (products.length === 0) {
        container.innerHTML = "<p> No product found </p>"
        return;
    }
    // console.log(products); -------------checking
    

    products.forEach(Item => {
    const div = document.createElement("div");
    div.id="card";

    div.innerHTML = `<i class="ri-heart-3-line"></i>
        <img src="${Item.images[0]}"
        alt="">
        <h3>${Item.title}</h3>
        <div id="details">
        <span class="brand">${Item.brand}</span>
        <span class="rating">⭐ ${Item.rating}</span>
            <span class="">₹${Item.price}</span>
        </div>
        <p>$${Item.price}</p>`
            
        container.appendChild(div);
    });
}

// search functionality 
function filters(input) {
    filteredProducts = allProducts.filter((p) => {
       return p.brand.toLowerCase().includes(input);   // loopHole - always use return explicitly in callbacks else always get undefined  
    });
}

// search icon click based searching
searchIcon.addEventListener("click" ,() => {
    const val = searchInput.value.toLowerCase();
    // console.log(val);---------------checking

    filters(val);
    renderProduct(filteredProducts);
});

// enter key press based searching
searchInput.addEventListener("keyup", (e) => { 
    if (e.key === "Enter"){
        const val = searchInput.value.toLowerCase();
    // console.log(val);---------------checking

        filters(val);
        renderProduct(filteredProducts);
    }
})
