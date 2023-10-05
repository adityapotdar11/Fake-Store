function getCategories() {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let html = `<div class="col-md-12 my-3"><h5 class="text-center">No categories found.</h5></div>`;
            let response = JSON.parse(this.responseText);
            if (response.length) {
                html = ``;
                for (let category of response) {
                    html += `<div class="col-md-6 my-3"><div class="card pointer" onclick="viewProducts('${btoa(category)}')"><div class="card-body"><div class="card-title text-center mb-0 text-capitalize">${category}</div></div></div></div>`;
                }
            }
            document.getElementById("categories-section").innerHTML = html;
        }
    });
    xhr.open("GET", "https://fakestoreapi.com/products/categories");
    xhr.send();
}

function viewProducts(category){
    location.href = `products.html?category=${category}`;
}

window.onload = function() {
    getCategories();
};
