let swiper; // Declare swiper instance globally

async function bestSell() {
    try {
  
        
        const res = await fetch('bestSelling.json');
        const data = await res.json();

        bindData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function bindData(data) {

        const bestSellTemplate = document.querySelector("#best-sell-template");
    const bestSellContainer = document.querySelector(".best-sell-container");

    bestSellContainer.innerHTML = ""; // Clear existing items before adding new ones

    data.forEach(Item => {
        const bestSellClone = bestSellTemplate.content.cloneNode(true);
        const productLink = bestSellClone.querySelector('a');
        const productImage = bestSellClone.querySelector('img');
        const productName = bestSellClone.querySelector('h3');
        const productPrice = bestSellClone.querySelector('p');

        productLink.href = `product.html?name=${Item.name}&price=${Item.price}&image=${Item.image}`;
        productImage.src = Item.image;
        productName.textContent = Item.name;
        productPrice.textContent = `RS ${Item.price}`;

        bestSellContainer.appendChild(bestSellClone);
    });

    // If swiper already exists, destroy it before reinitializing
    if (swiper) {
        swiper.destroy(true, true);
    }

    initializeSwiper(); // Initialize Swiper after all items are added
}

function initializeSwiper() {
    swiper = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
        }
    });

    swiper.update(); // Force update after adding slides
}

bestSell();

async function loadUsingFilter() {
    const res= await fetch('allProducts.json');
    const data = await res.json();
    let names=[];
    data.forEach((item) => {
        names.push(item.name);
    })
    loadName(names);
}
function loadName(names){
   
    // Adding input event listener for the search box
    searchInput.addEventListener("input", function () {
        let query = this.value.toLowerCase(); // Get the input query
        suggestionsList.innerHTML = ""; // Clear the suggestion list
        
        if (query.length === 0) {
            suggestionsList.classList.add("hidden"); // Hide suggestions if the input is empty
            return;
        }

        // Filter the names based on the query
        let filteredProducts = names.filter(name => name.toLowerCase().includes(query));

        // If there are matching products, display them
        if(filteredProducts.length === 0){
            let listItem = document.createElement("li");
            listItem.textContent = "No results found"; // Display the product name
            listItem.className = "p-2 hover:bg-gray-200 cursor-pointer"; // Add styles to the list item
            suggestionsList.appendChild(listItem); // Append the item to the suggestions list
        }
       else if (filteredProducts.length > 0) {
            filteredProducts.forEach(productName => {
                let listItem = document.createElement("li");
                listItem.textContent = productName; // Display the product name
                listItem.className = "p-2 hover:bg-gray-200 cursor-pointer"; // Add styles to the list item
                
                // Add click event to fill the input with the selected name
                listItem.addEventListener("click", () => {
                    searchInput.value = productName; // Set the input value to the selected product name
                    suggestionsList.classList.add("hidden"); // Hide the suggestion list after selection
                });
                suggestionsList.appendChild(listItem); // Append the item to the suggestions list
            });
            suggestionsList.classList.remove("hidden"); // Show the suggestion list
        } else {
            suggestionsList.classList.add("hidden"); // Hide if no match found
        }
    });
    
    // Hide suggestions if clicked outside
    document.addEventListener("click", function (e) {
        if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
            suggestionsList.classList.add("hidden"); // Hide suggestions when clicked outside
        }
    });
}

document.addEventListener('DOMContentLoaded', loadUsingFilter)




