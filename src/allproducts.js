const openSortList = document.querySelector(".open-sort-list");
const sortList = document.querySelector(".sort-list");
const sortingList = document.querySelectorAll(".sort-list a");
const sortOpenIcon = document.querySelector(".sort-open-icon");
const categories = document.querySelectorAll(".categories-ul li");
const menuBarSortList=document.querySelectorAll(".category-list li");
const urlParams = new URLSearchParams(window.location.search);
const categoriessss=urlParams.get('category');



// sorting acrding to use preferences
sortingList.forEach((list) => {
    list.addEventListener("click", () => {
        const selectedSort = list.textContent.trim();
        
        loadUsingSort(selectedSort, urlParams.get('category'));
    });
});

async function loadUsingSort(sort, category) {
    let fileName='';
    

    // Determine the correct JSON file based on category
   
    if (category === "Mens") {
        fileName = 'alljson/mens.json';
    } else if (category === "Womens") {
        fileName = 'alljson/womens.json';
    } else if (category === "Kids") {
        fileName = 'alljson/kids.json';
    } else {
        fileName = 'allProducts.json'; // Default to all products if no category is selected
    }
    if(fileName==='allProducts.json'){
    
        console.log(fileName)
        
    }
    // Fetch filtered category products
    const data = await fetchData(fileName);

    let sortedData;
    if (sort === "Price (Low to High)") {
        sortedData = data.sort((a, b) => a.price - b.price);
    } else if (sort === "Price (High to Low)") {
        sortedData = data.sort((a, b) => b.price - a.price);
    } else {
        sortedData = data; // If no sorting is selected, keep original order
    }

    bindData(sortedData);
}





// loading menu category
loadMenuCategory(categoriessss);
function loadMenuCategory(category) {
    fetchAndRenderCategoryData(category);
}




    



// Function to fetch and render category-wise products
menuBarSortList.forEach((category) => {
    category.addEventListener("click", () => {
        const selectedCategory = category.textContent;
        
        
    
        fetchAndRenderCategoryData(selectedCategory);
    });
})

// Show data based on selected category
categories.forEach((category) => {
    category.addEventListener("click", () => {
        fetchAndRenderCategoryData(categoriessss);
    });
});

// Toggle sorting options visibility
openSortList.addEventListener('click', () => {
    sortList.classList.toggle('hidden');
    sortOpenIcon.classList.toggle('rotate-180');
});

// Fetch and render all products initially
async function AllProducts() {
    const data = await fetchData('allProducts.json'); // Fetch all products data
    bindData(data);
}

// Fetch category-wise products and render them
async function fetchAndRenderCategoryData(category) {
    try{

   
    console.log(category)
    let fileName = '';

    // Depending on the selected category, load the appropriate file from the 'all' folder
    if (category === "Mens") {
        fileName = 'alljson/mens.json'; // Path to men's products
    } else if (category === "Womens") {
        fileName = 'alljson/womens.json'; // Path to women's products
    }
    else if(category === "Kids"){
        fileName = 'alljson/kids.json';
    }
     else {
        return AllProducts(); // Do nothing if the category is not recognized
    }
    //   console.log(fileName)
    const data = await fetchData(fileName);
    bindData(data);
} catch (error) {
    console.error("Error fetching data:", error);
}
}

// Fetch data from JSON file
async function fetchData(url) {
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to bind data to the DOM
function bindData(data) {
    const totalProductCount = document.querySelector(".total-product-count");
    totalProductCount.innerHTML = data.length;
    const Template = document.querySelector("template");
    const Container = document.querySelector(".container");

    // Clear previous data before appending new items
    Container.innerHTML = '';

    // Loop through each item and create product cards

    data.forEach(Item => {

        const Clone = Template.content.cloneNode(true);
        const productLink = Clone.querySelector('a');
        const productImage = Clone.querySelector('img');
        const productName = Clone.querySelector('h3');
        const productPrice = Clone.querySelector('p');

        productLink.href = `product.html?name=${Item.name}&price=${Item.price}&image=${Item.image}`;
        productImage.src = Item.image;
        productName.innerHTML = Item.name;
        productPrice.innerHTML = `RS: ${Item.price}`;
        productImage.alt = Item.name;

        Container.appendChild(Clone);
    });
}



