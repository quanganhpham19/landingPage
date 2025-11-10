import { db } from "./firebaseConfig.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Hàm đọc ID từ URL
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Hàm tải dữ liệu sản phẩm từ Firestore
async function loadProductDetail() {
  const productId = getProductIdFromURL();
  console.log("🆔 ID sản phẩm:", productId);

  if (!productId) return;

  try {
    const docRef = doc(db, "product", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("📦 Dữ liệu sản phẩm:", data);

      // Hiển thị dữ liệu lên HTML
      document.querySelector("h2.fw-bold").textContent =
        "Tên sản phẩm:" + data.name;
      document.querySelector(".price").textContent = `Giá sản phẩm: ${Number(
        data.price
      ).toLocaleString()}₫`;
      document.querySelector("#mainImage").src = data.image;

      // 👉 Thêm sự kiện nút giỏ hàng ở đây
      const addToCartBtn = document.getElementById("addToCartBtn");
      addToCartBtn.addEventListener("click", () => {
        addToCart(productId, data);
      });
    } else {
      console.warn("⚠️ Không tìm thấy sản phẩm!");
    }
  } catch (error) {
    console.error("⚠️ Lỗi tải sản phẩm:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadProductDetail);

// Hàm thêm vào giỏ hàng
function addToCart(id, product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === id);
  const pQuantity = document.getElementById("quantity").value;
  if (existing) {
    existing.quantity += Number(pQuantity);
  } else {
    cart.push({
      id: id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: 1,
    });
  }
  console.log("quantity", pQuantity);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("🛍️ Đã thêm sản phẩm vào giỏ hàng!");
}
