// ================= GLOBAL VARIABLES =================
let cart = [];
let currentRecipe = null;
let quantities = [];

// ================= TAB SWITCH =================
function showTab(tabId, element) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  element.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ================= ADD TO CART =================
function addToCart(name, price) {
  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCartCount();
  console.log(cart);
}

// ================= UPDATE CART COUNT =================
function updateCartCount() {
  let totalItems = 0;

  cart.forEach(item => totalItems += item.quantity);

  document.getElementById("cart-count").innerText = totalItems;
}

// ================= DROPDOWN FIX =================
document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();

      const menu = this.nextElementSibling;

      document.querySelectorAll('.dropdown-menu').forEach(m => {
        if (m !== menu) m.classList.remove('show');
      });

      menu.classList.toggle('show');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
    });
  });

});

// ================= CONTACT FORM =================
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  let isValid = true;

  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("messageError").innerText = "";
  document.getElementById("successMsg").innerText = "";

  if (name === "") {
    document.getElementById("nameError").innerText = "Name is required";
    isValid = false;
  }

  if (email === "") {
    document.getElementById("emailError").innerText = "Email is required";
    isValid = false;
  } else if (!email.includes("@")) {
    document.getElementById("emailError").innerText = "Enter valid email";
    isValid = false;
  }

  if (message === "") {
    document.getElementById("messageError").innerText = "Message cannot be empty";
    isValid = false;
  }

  if (isValid) {
    document.getElementById("successMsg").innerText = "✅ Message sent successfully!";
    document.getElementById("contactForm").reset();
  }
});

// ================= MAP =================
function loadMap() {
  document.getElementById("map-frame").innerHTML = `
    <iframe 
      src="https://www.google.com/maps?q=Pune&output=embed"
      width="100%" 
      height="300" 
      style="border:0;">
    </iframe>
  `;
}

// ================= FILTER RECIPES =================
function filterRecipes(type) {
  let cards = document.querySelectorAll(".recipe-card");

  cards.forEach(card => {
    if (type === "all" || card.dataset.type === type) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// ================= RECIPES DATA =================
const recipes = {
  paneer: {
    title: "Paneer Butter Masala",
    ingredients: ["Paneer", "Tomato", "Butter", "Cream", "Spices"],
    steps: [
      "Heat butter in pan",
      "Add tomato puree",
      "Add spices",
      "Add paneer cubes",
      "Cook for 10 mins"
    ]
  },

  biryani: {
    title: "Chicken Biryani",
    ingredients: ["Rice", "Chicken", "Spices"],
    steps: ["Cook rice", "Prepare gravy", "Layer and cook"]
  }
};

// ================= PRODUCT LINKS =================
const productLinks = {
  paneer: [
    { name: "Garam Masala", price: 200 },
    { name: "Turmeric Powder", price: 120 }
  ],
  biryani: [
    { name: "Biryani Masala", price: 180 }
  ]
};

// ================= OPEN RECIPE =================
function openRecipe(key) {
  currentRecipe = key;
  quantities = [];

  let r = recipes[key];

  document.getElementById("recipeTitle").innerText = r.title;

  // Ingredients
  let ing = "";
  r.ingredients.forEach(i => ing += `<li>${i}</li>`);
  document.getElementById("recipeIngredients").innerHTML = ing;

  // Steps
  let steps = "";
  r.steps.forEach(s => steps += `<li>${s}</li>`);
  document.getElementById("recipeSteps").innerHTML = steps;

  // Products
  let productsHTML = "";
  let total = 0;

  if (productLinks[key]) {
    productLinks[key].forEach((p, index) => {

      quantities[index] = 1;
      total += p.price;

      productsHTML += `
        <div class="recipe-product">
          <span>${p.name} - ₹${p.price}</span>

          <div class="qty-box">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span id="qty-${index}">1</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>

          <button onclick="addToCart('${p.name}', ${p.price})">
            Add
          </button>
        </div>
      `;
    });
  }

  document.getElementById("recipeProducts").innerHTML = productsHTML;
  document.getElementById("recipeTotal").innerText = total;

  document.getElementById("recipeModal").style.display = "block";
}

// ================= CLOSE RECIPE =================
function closeRecipe() {
  document.getElementById("recipeModal").style.display = "none";
}

// ================= CHANGE QUANTITY =================
function changeQty(index, change) {
  quantities[index] += change;

  if (quantities[index] < 1) quantities[index] = 1;

  document.getElementById(`qty-${index}`).innerText = quantities[index];

  updateTotal();
}

// ================= UPDATE TOTAL =================
function updateTotal() {
  let total = 0;

  if (productLinks[currentRecipe]) {
    productLinks[currentRecipe].forEach((p, i) => {
      total += p.price * quantities[i];
    });
  }

  document.getElementById("recipeTotal").innerText = total;
}

// ================= ADD ALL TO CART =================
function addAllToCart() {
  if (productLinks[currentRecipe]) {
    productLinks[currentRecipe].forEach((p, i) => {
      for (let j = 0; j < quantities[i]; j++) {
        addToCart(p.name, p.price);
      }
    });
  }
}