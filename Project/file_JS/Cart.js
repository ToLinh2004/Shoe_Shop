// Lưu trữ thông tin người dùng khi đăng nhập
function login(userId) {
  localStorage.setItem('userId', userId);
}

// Kiểm tra xem người dùng đã đăng nhập hay chưa
function isLoggedIn() {
  return localStorage.getItem('userId') !== null;
}

// Lấy thông tin người dùng hiện tại
function getCurrentUser() {
  return localStorage.getItem('userId');
}

// Đăng xuất người dùng
function logout() {
  localStorage.removeItem('userId');
}



let cart=[];

const productsApi='http://localhost:3000/products';
  // JavaScript
  
  function handleOnClick(productId) {
    if (!isLoggedIn()) {
      console.log("Người dùng chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      // Hiển thị thông báo cho người dùng
      return;
    }
  
    fetch(`${productsApi}/${productId}`)
      .then(response => response.json())
      .then(product => {
        const existingProduct = cart.find(item => item.productId === productId);
  
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          const newProduct = {
            productId: productId,
            product_name: product.product_name,
            img: product.img,
            description: product.description,
            price: product.price,
            quantity: 1
          };
  
          cart.push(newProduct);
        }
  
        const cartItem = {
          userId: getCurrentUser(),
          products: cart,
          totalprice: calculateTotalPrice(cart)
        };
  
        fetch(cartApi, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cartItem)
        })
        .then(function (response) {
          if (response.ok) {
            console.log("Product added successfully");
            // Thực hiện các hành động khác sau khi thêm sản phẩm thành công
          } else {
            console.error("Error adding product:", response.status);
            // Xử lý lỗi khi không thể thêm sản phẩm
          }
        })
        .catch(function (error) {
          console.error("Error adding product:", error);
          // Xử lý lỗi khi có lỗi trong quá trình gửi yêu cầu
        });
      });
  }

  

// addToCart();

// Hàm để hiển thị giỏ hàng 
const cartApi = "http://localhost:3000/cart";
function calculateTotalPrice(cart) {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  return total;
}

fetch(cartApi)
  .then((response) => response.json())
  .then((cart) => {
    console.log(cart);
    var container = document.getElementById("showCart");
    var cartHtml = "";
    cartHtml += `
      <table class="table table-hover">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th></th>
            <th>SIZE</th>
            <th>PRICE</th>
            <th>QTY</th>
            <th colspan="2">UNIT PRICE</th>
          </tr>
        </thead>
        <tbody>
    `;
    cart.forEach(item => {
      item.productId.forEach(product => {
        cartHtml += `
          <tr>
            <td class="align-middle"><img class="rounded" src="${product.img}" style="max-width: 200px; height: auto;"></td>
            <td class="align-middle">${product.product_name}</td>
            <td class="align-middle">${product.size}</td>
            <td class="align-middle">${product.price}</td>
            <td class="align-middle">
                <div class="col-3">
                    <input type="number" class="form-control btn btn-secondary" value="${product.quantity}">
                </div>
            </td>
            <td class="align-middle">${item.totalprice}</td>
            <td class="align-middle">
                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#myDelete"><i class="fa fa-trash fa-lg me-2" aria-hidden="true"></i></button>
            </td>
          </tr>
      `;})});
    
    cartHtml += ` 
    </tbody>
  </table>`;
container.innerHTML = cartHtml;})


        