var handleOnclick = (id) => {
  fetch(`${productsApi}/${id}`)
    .then(res => res.json())
    .then((product) => {
      var container = document.getElementById('detai_product'); // Lấy phần tử HTML có id 'body' và gán vào biến container
      var htmls = ''; // Khởi tạo chuỗi HTML rỗng

      // Duyệt qua từng sản phẩm và tạo chuỗi HTML cho mỗi sản phẩm
      htmls += `
    <div class="row">
        <!-- Cột chứa hình ảnh sản phẩm -->
        <div class="col-md-4">
          <img
            src="${product.img}"
            style="height: 320px;
            alt="Product Image" class="w-100">
        </div>
        <!-- Cột chứa thông tin sản phẩm -->
        <div class="col-md-8">
          <div class="product-info">
            <h2>${product.product_name}</h2>
            <p><b>Price: $${product.price}</b></p>
            <!-- Dòng chứa thông tin số lượng -->
            <div class="row align-items-center">
              <div class="col-6">
                <p><b>Quantity:</b></p>
              </div>
              <div class="col-3">
                <div class="input-group">
                  <input type="number" class="form-control" value="${product.quantity}">
                </div>
              </div>
            </div>
            <!-- Dòng chứa thông tin size -->
            <div class="row align-items-center">
              <div class="col-6">
                <p><b>Size:</b></p>
              </div>
              <div class="col-3">
                <div class="input-group">
                  <select class="form-select">
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                </div>
              </div>
            </div>
            <p><b>Description:</b></p>
            <p>
              ${product.description}
            </p>
          </div>
        </div>
    </div>
    `;

      container.innerHTML = htmls;
    })
}