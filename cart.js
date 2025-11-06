// Đọc dữ liệu giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBody = document.getElementById("cart-body");
const cartTotal = document.getElementById("cart-total");

// 🧮 Hàm tính tổng tiền
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toLocaleString() + "₫";
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 🗑️ Hàm xóa sản phẩm
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
  updateTotal();
}

// 🔢 Hàm cập nhật số lượng
function changeQuantity(id, value) {
  const product = cart.find(item => item.id === id);
  if (product) {
    product.quantity = Math.max(1, Number(value));
    renderCart();
    updateTotal();
  }
}

// 🎨 Hàm hiển thị giỏ hàng
function renderCart() {
  if (cart.length === 0) {
    cartBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-5">Giỏ hàng trống</td></tr>`;
    cartTotal.textContent = "0₫";
    return;
  }

  cartBody.innerHTML = cart.map(item => `
    <tr>
      <td><img src="${item.image}" class="product-img rounded" width="70"></td>
      <td>${item.name}</td>
      <td>${item.price.toLocaleString()}₫</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" class="form-control form-control-sm"
          style="width:80px;" onchange="changeQuantity('${item.id}', this.value)">
      </td>
      <td>${(item.price * item.quantity).toLocaleString()}₫</td>
      <td><button class="btn btn-sm btn-outline-danger" onclick="removeItem('${item.id}')">✕</button></td>
    </tr>
  `).join("");
}

renderCart();
updateTotal();
