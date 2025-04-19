const hamburgerIcon=document.querySelector(".hamburger-icon");
const addToCart=document.querySelectorAll(".add-to-cart");
const cartItem=document.querySelector("#cart-item");
const menuBar=document.querySelector(".menu-bar");
const closeMenuBar=document.querySelector("#close-menu-bar");
const cartIcon=document.querySelector(".cart-icon");
const cartList=document.querySelector(".cart-list");
const closeCartList=document.querySelector("#close-cart-list");
const removeCartItem=document.querySelectorAll("#remove-cart-item");
const heartIcon=document.querySelector(".heart-icon");
const dropdownBar=document.querySelector("#dropdown-bar");
const categoryList=document.querySelector("#category-list");
const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById("suggestions-list")
const searchIcon = document.getElementById('search-icon');





hamburgerIcon.addEventListener('click', () => {

    menuBar.classList.toggle('hidden');
})
closeMenuBar.addEventListener('click', () => {
    menuBar.classList.toggle('hidden');
})

heartIcon.addEventListener('click', () => {
    heartIcon.src=`./assets/icons/heart-fill.png`;
})
dropdownBar.addEventListener('click', () => {   
    categoryList.classList.toggle('hidden');
    dropdownBar.classList.toggle('rotate-180');
})





function scrollAnimation(...elementClasses) {
    // Loop through all the class names passed
    elementClasses.forEach(elementClass => {
        const elements = document.querySelectorAll(`.${elementClass}`);
        
        if (!elements.length) return; // Exit if no elements found

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show"); // Add the class for animation

                    // Lazy load image if it is an img tag
                    if (entry.target.tagName.toLowerCase() === "img" && entry.target.dataset.src) {
                        entry.target.src = entry.target.dataset.src; // Load the image
                    }

                    observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% is visible

        elements.forEach(element => observer.observe(element));
    });
}

// Call function with multiple class names as arguments
scrollAnimation("hero-text-container", "lazy-image", "another-class");

scrollAnimation("lazy-image","hero-text-container");

addToCart.forEach(item => item.addEventListener('click', () => {
   const cartItem=document.querySelector("#cart-item");
   console.log(cartItem)

}))




searchIcon.addEventListener('click', () => {
    searchItem();
   
    async function searchItem() {
        // Fetch the products data
        const res = await fetch('allProducts.json');
        const data = await res.json();
        
        // Find the product based on search input (you can customize the search logic)
        let searchProduct = data.find(product => product.name.toLowerCase() === searchInput.value.toLowerCase());

        if (searchProduct) {
            // If product is found, pass name, img, and price in the URL
            let { name, price, image } = searchProduct;
            window.location.href = `product.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
        } else {
            console.log("Product not found!");
        }
    }
});