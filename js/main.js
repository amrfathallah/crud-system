var productNameInput = document.getElementById("ProductName");
var ProductPriceInput = document.getElementById("ProductPrice");
var ProductCategoryInput = document.getElementById("ProductCategory");
var ProductDescriptionInput = document.getElementById("ProductDescription");
var productSearchInput = document.getElementById("searchProduct");
var updateIndex;
var productContainer = [];

if (localStorage.getItem("products") != null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayData();
}

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: ProductPriceInput.value,
    category: ProductCategoryInput.value,
    desc: ProductDescriptionInput.value,
  };
  productContainer.push(product);
  console.log(productContainer);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayData();
  clearData();
}
function clearData() {
  productNameInput.value = "";
  ProductPriceInput.value = "";
  ProductCategoryInput.value = "";
  ProductDescriptionInput.value = "";
  productSearchInput.value = "";
}

document.getElementById("addBtn").addEventListener("click", function () {
  addProduct();
});

function displayData() {
  var box = "";
  for (var i = 0; i < productContainer.length; i++) {
    box += `
        <tr>
                        <td>${i + 1}</td>
                        <td>${productContainer[i].name}</td>
                        <td>${productContainer[i].price}</td>
                        <td>${productContainer[i].category}</td>
                        <td>${productContainer[i].desc}</td>
                        <td>
                            <button class="btn btn-outline-warning btn-sm mb-1" onclick="setData(${i})">Update</button>
                            <button class="btn btn-outline-danger btn-sm mb-1" onclick="deleteData(${i})">Delete</button>
                        </td>
                    </tr>`;
  }
  document.getElementById("tableData").innerHTML = box;
}

function searchProduct() {
  var term = productSearchInput.value;
  var box = "";
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      box += `
            <tr>
                            <td>${i + 1}</td>
                            <td>${productContainer[i].name}</td>
                            <td>${productContainer[i].price}</td>
                            <td>${productContainer[i].category}</td>
                            <td>${productContainer[i].desc}</td>
                            <td>
                                <button class="btn btn-outline-warning btn-sm mb-1" onclick="setData(${i})">Update</button>
                                <button class="btn btn-outline-danger btn-sm mb-1" onclick="deleteData(${i})">Delete</button>
                            </td>
                        </tr>`;
    }
  }
  document.getElementById("tableData").innerHTML = box;
}
document.getElementById("searchProduct").addEventListener("input", function () {
  searchProduct();
});

function deleteData(elementNum) {
  productContainer.splice(elementNum, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayData();
}

function setData(index) {
  updateIndex = index;
  var currentProduct = productContainer[index];
  productNameInput.value = currentProduct.name;
  ProductPriceInput.value = currentProduct.price;
  ProductCategoryInput.value = currentProduct.category;
  ProductDescriptionInput.value = currentProduct.desc;
  document.getElementById("addBtn").classList.add("d-none");
  document.getElementById("updateBtn").classList.add("d-block");
  document.getElementById("addBtn").classList.remove("d-block");
  document.getElementById("updateBtn").classList.remove("d-none");
}

function updateData() {
  var product = {
    name: productNameInput.value,
    price: ProductPriceInput.value,
    category: ProductCategoryInput.value,
    desc: ProductDescriptionInput.value,
  };
  productContainer.splice(updateIndex, 1, product);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayData();
  document.getElementById("updateBtn").classList.add("d-none");
  document.getElementById("addBtn").classList.add("d-block");
  document.getElementById("updateBtn").classList.remove("d-block");
  document.getElementById("addBtn").classList.remove("d-none");
  clearData();
}
document.getElementById("updateBtn").addEventListener("click", function () {
  updateData();
});
