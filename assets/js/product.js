const urlParams = new URLSearchParams(window.location.search);
var prodId = urlParams.get("data");
if (prodId) {
    prodId = atob(prodId);
} else {
    location.href = "products.html";
}

function getSingleProduct() {
    jQuery("#loader").show();
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let response = JSON.parse(this.responseText);
            if (response) {
                document.getElementById(
                    "product-img-sec"
                ).innerHTML = `<img class="product-img" src="${response.image}" />`;
                document.getElementById("product-title").innerHTML =
                    response.title;
                document.getElementById("product-desc").innerHTML =
                    response.description;
                document.getElementById("product-price").innerHTML =
                    "$" + response.price;
                let words = response.category.split(" ");

                words = words
                    .map((word) => {
                        return word[0].toUpperCase() + word.substring(1);
                    })
                    .join(" ");
                document.getElementById("product-category").innerHTML = words;
            } else {
                location.href = "products.html";
            }
            jQuery("#loader").hide();
        }
    });
    xhr.open("GET", `https://fakestoreapi.com/products/${prodId}`);
    xhr.send();
}

function keepValue() {
    let count = document.getElementById("count").value;
    if (count) {
        if (parseInt(count) < 1) {
            document.getElementById("count").value = 1;
        } else if (parseInt(count) > 9) {
            document.getElementById("count").value = 9;
        } else {
            document.getElementById("count").value = parseInt(count);
        }
    } else {
        document.getElementById("count").value = 1;
    }
}

function addCount() {
    let count = document.getElementById("count").value;
    if (parseInt(count) < 9) {
        document.getElementById("count").value = parseInt(count) + 1;
    }
}
function reduceCount() {
    let count = document.getElementById("count").value;
    if (parseInt(count) > 1) {
        document.getElementById("count").value = parseInt(count) - 1;
    }
}

function addToCart() {
    jQuery("#loader").show();
    let count = document.getElementById("count").value;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    if (month < 10) {
        month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    let payload = {
        userId: 1,
        date: year+"-"+month+"-"+day,
        products: [
            {
                productId: prodId,
                quantity: count,
            },
        ],
    };    
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            location.href = "cart.html";
        }
    });
    xhr.open("POST", `https://fakestoreapi.com/carts`);
    xhr.send(JSON.stringify(payload));
}

window.onload = function () {
    getSingleProduct();
};
