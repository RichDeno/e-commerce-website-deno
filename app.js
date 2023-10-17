var wrapper = document.querySelector(".slider-wrapper");
var menuItems = document.querySelectorAll(".menu-item");

var products = [
    {
        id: 1,
        title: "Adidas",
        price: 108,
        colors: [
            {
                code: "black",
                img: "img/Adidas Superstars.png", //Product 1 //
            },
            {
                code: "gray",
                img: "img/Adidas Superstars2.png", //Product 2 //
            },
        ],
    },

    {
        id: 2,
        title: "Air Max 90",
        price: 140,
        colors: [
            {
                code: "black",
                img: "img/Air Max 90.png", //Product 1 //
            },
            {
                code: "yellow",
                img: "img/Air Max 90_2.png", //Product 2 //
            },
        ],
    },

    {
        id: 3,
        title: "Air Force",
        price: 135,
        colors: [
            {
                code: "white",
                img: "img/Air Force One.png", //Product 1 //
            },
            {
                code: "red",
                img: "img/Air Force One2.png", //Product 2 //
            },
        ],
    },

    {
        id: 4,
        title: "Dunk Low",
        price: 124,
        colors: [
            {
                code: "green",
                img: "img/Nike Dunk Low.png", //Product 1 //
            },
            {
                code: "blue",
                img: "img/Nike Dunk Low2.png", //Product 2 //
            },
        ],
    },

    {
        id: 5,
        title: "Converse",
        price: 100,
        colors: [
            {
                code: "black",
                img: "img/Converse.png",
            },
            {
                code: "red",
                img: "img/Converse2.png", 
            },
        ],
    },
];

let chosenProduct = products[0];

var currentProductImg = document.querySelector(".product-img");
var currentProductTitle = document.querySelector(".product-title");
var currentProductPrice = document.querySelector(".product-price");
var currentProductColors = document.querySelectorAll(".color");
var currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
       
        wrapper.style.transform = `translateX(${-100 * index}vw)`;

        
        chosenProduct = products[index];

    
        currentProductImg.src = chosenProduct.colors[0].img;
        currentProductTitle.textContent = chosenProduct.title;
        currentProductPrice.textContent = "$" + chosenProduct.price;

        
        currentProductColors.forEach((color, index) => {
            color.style.backgroundColor = chosenProduct.colors[index].code;
        });
        
    });
});


currentProductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
        currentProductImg.src = chosenProduct.colors[index].img;
    });
});

currentProductSizes.forEach((size, index) => {
    size.addEventListener("click", () => {
        currentProductSizes.forEach((size) => {
            size.style.backgroundColor = "white";
            size.style.color = "black";
        });
        size.style.backgroundColor = "black";
        size.style.color = "white";
    });
});


var productButton = document.querySelector(".product-button");
var payment = document.querySelector(".payment");
var close = document.querySelector(".close");


// Cart
const btnCart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnClose = document.querySelector("#cart-close");

btnCart.addEventListener("click", () => {
    cart.classList.add("cart-active");
});

btnClose.addEventListener("click", () => {
    cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadItem);

function loadItem() {
    loadContent();
}

function loadContent() {
    //Remove product Items From Cart
    let btnRemove = document.querySelectorAll(".cart-remove");
    btnRemove.forEach((btn) => {
        btn.addEventListener("click", removeItem);
    });

    //Product Item Change Event
    let qtyElements = document.querySelectorAll(".cart-quantity");
    qtyElements.forEach((input) => {
        input.addEventListener("change", changeQty);
    });

    //Product Cart

    let cartBtns = document.querySelectorAll(".add-cart");
    cartBtns.forEach((btn) => {
        btn.addEventListener("click", addCart);
    });

    updateTotal();
}

//Remove Item
function removeItem() {
    if (confirm("Are Your Sure to Remove")) {
        let title =
            this.parentElement.querySelector(".cart-food-title").innerHTML;
        itemList = itemList.filter((el) => el.title != title);
        this.parentElement.remove();
        loadContent();
    }
}

//Change Quantity
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadContent();
}

let itemList = [];

//Add Cart
function addCart() {
    let food = this.parentElement;
    let title = food.querySelector(".product-title").innerHTML;
    let price = food.querySelector(".product-price").innerHTML;
    let imgSrc = food.querySelector(".product-img").src;
    //console.log(title,price,imgSrc);

    let newProduct = { title, price, imgSrc };

    //Check Product already Exist in Cart
    if (itemList.find((el) => el.title == newProduct.title)) {
        alert("Product Already added in Cart");
        return;
    } else {
        itemList.push(newProduct);
    }

    let newProductElement = createCartProduct(title, price, imgSrc);
    let element = document.createElement("div");
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector(".cart-content");
    cartBasket.append(element);
    loadContent();
}

function createCartProduct(title, price, imgSrc) {
    return `
<div class="cart-box">
<img src="${imgSrc}" class="cart-img">
<div class="detail-box">
  <div class="cart-food-title">${title}</div>
  <div class="price-box">
    <div class="cart-price">${price}</div>
     <div class="cart-amt">${price}</div>
 </div>
  <input type="number" value="1" class="cart-quantity">
</div>
  <ion-icon name="trash" class="cart-remove"></ion-icon>
</div>
`;
}

function updateTotal() {
    const cartItems = document.querySelectorAll(".cart-box");
    const totalValue = document.querySelector(".total-price");

    let total = 0;

    cartItems.forEach((product) => {
        let priceElement = product.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
        let qty = product.querySelector(".cart-quantity").value;
        total += price * qty;
        product.querySelector(".cart-amt").innerText = "Rs." + price * qty;
    });

    totalValue.innerHTML = "Rs." + total;

    // Add Product Count in Cart Icon

    const cartCount = document.querySelector(".cart-count");
    let count = itemList.length;
    cartCount.innerHTML = count;

    if (count == 0) {
        cartCount.style.display = "none";
    } else {
        cartCount.style.display = "block";
    }
}


// Payment Section
// function openPayment() {
//     document.getElementById("payment").style.display = "flex";
//     closeCart();
//   }
  

//   document.getElementById("placeOrderButton").addEventListener("click", function() {
//     openPayment(); 
//   });


// Product Button 
var productButton = document.querySelector(".btn-buy");
var payment = document.querySelector(".payment");
var close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex"
})

close.addEventListener("click", () => {
  payment.style.display = "none"
})