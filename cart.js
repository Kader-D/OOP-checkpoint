class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
      this.liked = false; // Par défaut, l'article n'est pas aimé
    }
  
    // Méthode pour calculer le prix total de l'article
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.items = [];
      this.totalPriceElement = document.getElementById('total-price');
      this.cartElement = document.getElementById('cart');
    }
  
    // Ajouter un article au panier
    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.renderCart();
    }
  
    // Ajuster la quantité d'un article
    updateQuantity(productId, amount) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
          this.removeItem(productId);
        }
      }
      this.renderCart();
    }
  
    // Supprimer un article du panier
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.renderCart();
    }
  
    // Aimer ou ne plus aimer un article
    toggleLike(productId) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        item.liked = !item.liked;
      }
      this.renderCart();
    }
  
    // Recalculer le prix total
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    // Afficher les articles du panier
    renderCart() {
      this.cartElement.innerHTML = '';
      this.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
          <p>${item.product.name} - $${item.product.price} x ${item.quantity} = $${item.getTotalPrice()}</p>
          <button onclick="cart.updateQuantity(${item.product.id}, 1)">+</button>
          <button onclick="cart.updateQuantity(${item.product.id}, -1)">-</button>
          <button onclick="cart.removeItem(${item.product.id})">Supprimer</button>
          <button onclick="cart.toggleLike(${item.product.id})" class="${item.liked ? 'liked' : ''}">❤️</button>
        `;
        this.cartElement.appendChild(itemElement);
      });
      this.totalPriceElement.textContent = this.getTotalPrice();
    }
  }
  
  // Initialisation du panier avec quelques articles présélectionnés
  const cart = new ShoppingCart();
  const product1 = new Product(1, 'Laptop', 1000);
  const product2 = new Product(2, 'Phone', 500);
  
  cart.addItem(product1, 1);
  cart.addItem(product2, 2);
  