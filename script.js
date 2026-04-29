const products = [
  { id: 1, name: "蓝牙耳机", desc: "降噪无线，续航 24 小时", price: 199 },
  { id: 2, name: "机械键盘", desc: "87 键红轴，支持热插拔", price: 329 },
  { id: 3, name: "便携水杯", desc: "保温 8 小时，500ml", price: 59 },
  { id: 4, name: "桌面台灯", desc: "三档亮度，护眼无频闪", price: 89 },
];

const cart = new Map();

const productList = document.getElementById("productList");
const productTemplate = document.getElementById("productTemplate");
const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

function renderProducts() {
  products.forEach((product) => {
    const node = productTemplate.content.cloneNode(true);
    node.querySelector(".name").textContent = product.name;
    node.querySelector(".desc").textContent = product.desc;
    node.querySelector(".price").textContent = `¥${product.price}`;
    node.querySelector(".add-btn").addEventListener("click", () => addToCart(product));
    productList.appendChild(node);
  });
}

function addToCart(product) {
  const item = cart.get(product.id) || { ...product, qty: 0 };
  item.qty += 1;
  cart.set(product.id, item);
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalQty += item.qty;
    totalPrice += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `<span>${item.name} x ${item.qty}</span><strong>¥${item.price * item.qty}</strong>`;
    cartItems.appendChild(li);
  });

  cartCount.textContent = String(totalQty);
  cartTotal.textContent = String(totalPrice);
}

cartButton.addEventListener("click", () => {
  cartPanel.classList.toggle("hidden");
});

checkoutButton.addEventListener("click", () => {
  if (cart.size === 0) {
    alert("购物车为空，请先添加商品。");
    return;
  }
  alert("下单成功，感谢你的购买！");
  cart.clear();
  renderCart();
  cartPanel.classList.add("hidden");
});

renderProducts();
