function loadCart() {
    jQuery("#loader").show();
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let html = false;
            let subtotal = 0;
            let response = JSON.parse(this.responseText)[0];
            if (response) {
                if (response.products.length > 0) {
                    html = ``;
                    for (let prod of response.products) {
                        getSingleProduct(prod.productId)
                            .then(function (data) {
                                console.log(prod);
                                html += `<tr>
                                            <td scope="col" class="cart-icon-sec"><i data-feather="x-circle"></i></td>
                                            <td scope="col" class="cart-img-section">
                                                <img src="${data.image}" />
                                            </td>
                                            <td scope="col">${data.title}</td>
                                            <td scope="col">$${data.price}</td>
                                            <td scope="col">
                                                <input type="number" value="${
                                                    prod.quantity
                                                }" class="form-control" min="1" max="10" style="width: 60px;"/>
                                            </td>
                                            <td scope="col">$${
                                                data.price * prod.quantity
                                            }</td>
                                    </tr>`;
                                subtotal += data.price * prod.quantity;
                                document.getElementById("cart-data").innerHTML =
                                html;
                                document.getElementById("subtotal").innerHTML = "$"+subtotal;
                                document.getElementById("total").innerHTML = "$"+subtotal;
                                feather.replace();
                            })
                            .catch(function (error) {
                                console.error(error);
                            });
                    }
                }
            }
            jQuery("#loader").hide();
        }
    });
    xhr.open("GET", `https://fakestoreapi.com/carts/user/1`);
    xhr.send();
}

function mapCartData() {}

function getSingleProduct(prodId) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let response = JSON.parse(this.responseText);
                if (response) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }
        });
        xhr.open("GET", `https://fakestoreapi.com/products/${prodId}`);
        xhr.send();
    });
}

window.onload = function () {
    loadCart();
};
