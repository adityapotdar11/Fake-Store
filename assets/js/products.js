const urlParams = new URLSearchParams(window.location.search);
var category = urlParams.get("category");
if (category) {
    category = atob(category);
} else {
    category = "all";
}

function getProducts() {
    jQuery("#loader").show();
    if (category != "all") {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let html = `<div class="col-md-12 my-3"><h5 class="text-center">No products found.</h5></div>`;
                let response = JSON.parse(this.responseText);
                if (response.length) {
                    html = ``;
                    for (let product of response) {
                        let words = product.category.split(" ");

                        words = words
                            .map((word) => {
                                return (
                                    word[0].toUpperCase() + word.substring(1)
                                );
                            })
                            .join(" ");
                        html += `<div class="col-md-3 my-1"><div class="card">
                        <img src="${
                            product.image
                        }" alt="" class="bd-placeholder-img card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">${product.title.slice(
                                0,
                                25
                            )}${product.title.length > 25 ? "..." : ""}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary"><b>Price:</b> $${
                                product.price
                            }</h6>
                            <h6 class="card-subtitle mb-2 text-body-secondary"><b>Category:</b> ${words}</h6>
                            <p class="card-text">${product.description.slice(
                                0,
                                97
                            )}${
                            product.description.length > 97 ? "..." : ""
                        }</p>
                            <a href="./product.html?data=${btoa(
                                product.id
                            )}" class="card-link">View Product</a>
                        </div>
                    </div></div>`;
                    }
                    document.getElementById("products-list").innerHTML = html;
                }
                jQuery("#loader").hide();
            }
        });
        xhr.open(
            "GET",
            `https://fakestoreapi.com/products/category/${category}`
        );
        xhr.send();
    } else {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let html = `<div class="col-md-12 my-3"><h5 class="text-center">No products found.</h5></div>`;
                let response = JSON.parse(this.responseText);
                if (response.length) {
                    html = ``;
                    for (let product of response) {
                        let words = product.category.split(" ");

                        words = words
                            .map((word) => {
                                return (
                                    word[0].toUpperCase() + word.substring(1)
                                );
                            })
                            .join(" ");
                        html += `<div class="col-md-3 my-1"><div class="card">
                        <img src="${
                            product.image
                        }" alt="" class="bd-placeholder-img card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">${product.title.slice(
                                0,
                                25
                            )}${product.title.length > 25 ? "..." : ""}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary"><b>Price:</b> $${
                                product.price
                            }</h6>
                            <h6 class="card-subtitle mb-2 text-body-secondary"><b>Category:</b> ${words}</h6>
                            <p class="card-text">${product.description.slice(
                                0,
                                97
                            )}${
                            product.description.length > 97 ? "..." : ""
                        }</p>
                            <a href="./product.html?data=${btoa(
                                product.id
                            )}" class="card-link">View Product</a>
                        </div>
                    </div></div>`;
                    }
                    document.getElementById("products-list").innerHTML = html;
                }
                jQuery("#loader").hide();
            }
        });
        xhr.open("GET", `https://fakestoreapi.com/products`);
        xhr.send();
    }
}

function changeCategory() {
    jQuery("#loader").show();
    let words = category.split(" ");

    words = words
        .map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");

    document.getElementById("category-disp").innerHTML = words;
    document.getElementById("categories-select").value = category;
    jQuery("#loader").hide();
    getProducts();
}

function getCategories() {
    jQuery("#loader").show();
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var select = document.getElementById("categories-select");
            var option = document.createElement("option");
            option.text = "All";
            option.value = "all";
            select.add(option);
            let response = JSON.parse(this.responseText);
            if (response.length) {
                for (let resCategory of response) {
                    option = document.createElement("option");
                    let words = resCategory.split(" ");
                    words = words
                        .map((word) => {
                            return word[0].toUpperCase() + word.substring(1);
                        })
                        .join(" ");
                    option.text = words;
                    option.value = resCategory;
                    select.add(option);
                }
            }
            jQuery("#loader").hide();
            changeCategory();
        }
    });
    xhr.open("GET", "https://fakestoreapi.com/products/categories");
    xhr.send();
}

function changeCat() {
    category = document.getElementById("categories-select").value;
    changeCategory();
}

window.onload = function () {
    getCategories();
};
