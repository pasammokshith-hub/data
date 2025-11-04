// Simulate a MongoDB-like nested data structure
let catalog = [];

const productList = document.getElementById("productList");
const addProductBtn = document.getElementById("addProductBtn");

// Function to render all products
function renderProducts() {
  productList.innerHTML = "";

  catalog.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Category:</strong> ${product.category.name} ➜ ${product.category.subCategory}</p>

      <div>
        <strong>Variants:</strong>
        <ul>
          ${product.variants.map(v => `<li class="variant">${v.color} (${v.stock} in stock)</li>`).join('')}
        </ul>
        <button class="add-btn" onclick="addVariant(${index})">+ Add Variant</button>
      </div>

      <div>
        <strong>Reviews:</strong>
        <ul>
          ${product.reviews.map(r => `<li class="review">${r.user}: ⭐${r.rating} - "${r.comment}"</li>`).join('')}
        </ul>
        <button class="add-btn" onclick="addReview(${index})">+ Add Review</button>
      </div>
    `;

    productList.appendChild(card);
  });
}

// Add new product (simulating inserting a document in MongoDB)
addProductBtn.addEventListener("click", () => {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const category = document.getElementById("category").value;
  const subCategory = document.getElementById("subCategory").value;

  if (!name || !price || !category || !subCategory) {
    alert("Please fill in all fields!");
    return;
  }

  const newProduct = {
    name,
    price: parseFloat(price),
    category: { name: category, subCategory: subCategory },
    variants: [],
    reviews: []
  };

  catalog.push(newProduct);
  renderProducts();

  // Clear form
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("category").value = "";
  document.getElementById("subCategory").value = "";
});

// Add nested variant (like pushing to an array inside MongoDB)
function addVariant(index) {
  const color = prompt("Enter variant color:");
  const stock = prompt("Enter stock count:");

  if (color && stock) {
    catalog[index].variants.push({ color, stock: parseInt(stock) });
    renderProducts();
  }
}

// Add nested review
function addReview(index) {
  const user = prompt("Reviewer name:");
  const rating = prompt("Rating (1–5):");
  const comment = prompt("Comment:");

  if (user && rating && comment) {
    catalog[index].reviews.push({ user, rating: parseInt(rating), comment });
    renderProducts();
  }
}
