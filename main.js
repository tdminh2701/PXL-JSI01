let productList = [];

let productPickedList = JSON.parse(localStorage.getItem("mycart")) || [];
document.getElementById("countProduct").innerHTML = productPickedList.length;

const formatVNDCurrency = (number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};
const calcBill = (productPickedList) => {
  const totalBill = productPickedList.reduce(
    (accumulator, productPicked) => accumulator + productPicked.sellPrice,
    0
  );
  document.getElementById("total-money").innerHTML =
    formatVNDCurrency(totalBill);
};
calcBill(productPickedList);

const removeItem = (index) => {
  // xoá sản phẩm từ index nhận vào của hàm
  productPickedList.splice(index, 1);
  // cập nhật local storage
  localStorage.setItem("mycart", JSON.stringify(productPickedList));
  renderCart(productPickedList);
  calcBill(productPickedList);
};

const renderCart = (mycart) => {
  // xu ly hien thi gio hang khi moi vao trang web
  if (mycart.length > 0) {
    // gio hang co san pham
    let htmlString = "";
    mycart.map((cartItem, index) => {
      htmlString += `
        <div class="cart-item d-flex my-3">
          <img
            class="me-3"
            src="${cartItem.image}"
            alt=""
            style="width: 120px; height: 120px; border-radius: 8px"
          />
          <div>
          <h4>${cartItem.name}</h4>
          <small class="text-primary">
          ${formatVNDCurrency(cartItem.sellPrice)}
          </small>
          <div class=""></div>
          <small class="text-decoration-line-through">
          ${formatVNDCurrency(cartItem.orPrice)}
          </small>
          <button class="removebtn btn btn-warning" onclick="removeItem(${index})">Xoá</button>
          </div>
        </div>
      `;
    });
    document.getElementById("cart-body").innerHTML = htmlString;
  } else {
    // gio hang rong
    document.getElementById("cart-body").innerHTML = `
    <div class="flex-fill">
      <img class="w-100" src="shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.avif" alt="" />
      <p class="text-center">Chưa có sản phẩm nào bên trong giỏ hàng</p>
    </div> 
  `;
  }
};
renderCart(productPickedList);
//rewatch this thing above
const addToCart = (id) => {
  console.log(id);
  console.log(productList);
  const productPicked = productList.find((product) => product.id == id);
  console.log(productPicked);
  productPickedList.push(productPicked);
  localStorage.setItem("mycart", JSON.stringify(productPickedList));
  document.getElementById("countProduct").innerHTML = productPickedList.length;
  let newdata = JSON.parse(localStorage.getItem("mycart")) || [];
  renderCart(newdata);
  calcBill(productPickedList);
};

const idsIphone = [1, 2, 3, 4];
const idsMacbook = [5, 6, 7, 8];
const idsiPad = [9, 10, 11, 12];
const renderProductList = (productValues, idsFilter, idDom) => {
  const iphoneList = productValues.filter((product) =>
    idsFilter.includes(product.id)
  );

  let htmlString = "";
  iphoneList.map((productItem) => {
    htmlString += `
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="productItem card border-0 shadow p-3 mb-5 bg-body-tertiary rounded">
            <img src="${productItem.image}">
            <div class="card-body">
                <h5 class="card-title">${productItem.name}</h5>
                <span class="phone-Value text-primary">${formatVNDCurrency(
                  productItem.sellPrice
                )}</span>
                <span class="phone-Exvalue text-decoration-line-through">${formatVNDCurrency(
                  productItem.orPrice
                )}</span>
                <button class="btn w-100 btn-primary atc-button" onclick="addToCart(${
                  productItem.id
                })">Thêm vào giỏ hàng</button>
            </div>
        </div>
      </div>
      `;
  });
  document.getElementById(idDom).innerHTML = htmlString;
};
fetch("https://649ed155245f077f3e9cf127.mockapi.io/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    productList = [...data];
    renderProductList(data, idsIphone, "iPhoneList");
    renderProductList(data, idsMacbook, "macBookList");
    renderProductList(data, idsiPad, "iPadList");
  });
