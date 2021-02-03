const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

// переделать в ДЗ на промисы. НЕ ИСПОЛЬЗОВАТЬ fetch!!!
// let getRequest = (url, cb) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         cb(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// }
// ------------------------------------------------

let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error');
        } else {
          resolve(xhr.responseText);
        }
      }
    }
    xhr.send();
  })
};

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    this.container = container;
    // this._goods = [];
    this.#goods = [];
    this.#allProducts = [];

    // this.#fetchGoods();

    this.#getProducts().then((data) => {
      this.#goods = [...data];
      this.#render();
    });
  }

  sum() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }

  // #fetchGoods() {
  //   getRequest(`${API}catalogData.json`, (data) => {
  //     console.log(data);
  //     this.#goods = JSON.parse(data);
  //     this.#render();
  //     console.log(this.#goods);
  //   })
  // }

  #getProducts() {
    return fetch(`${API}catalogData.json`)
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
  }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img; // this.img = product.img || 'https://placehold.it/200x150';
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn" data-id="${this.id}" data-title="${this.title}" data-price="${this.price}">Купить</button>
              </div>
          </div>`;
  }
}
const productList = new ProductList();

// class Cart {
//   goods;
//   allCartItems;

//   constructor(container = '.cart-drop') {
//     this.container = container;
//     this.goods = [];
//     this.allCartItems = [];

// }

//   renderCart() {
//     let cartBlock = document.querySelector(this.container);
//     if (goods.length > 0) {
//       for (let item of this.goods) {
//         const cartItem = new CartItem(item);
//         console.log(cartItem);
//         this.allCartItems.push(cartItem);
//         cartBlock.insertAdjacentHTML('afterbegin', cartItem.renderCartItem());
//       }
//     }
//   }

//   addGoodToCart(id, title, price){
//     let alreadyInCart = this.checkIfItemExists(id)
//     if (alreadyInCart) {
//         return cartItem.increaseGoodQuantity(this.quantity);
//       } else {
//         this.goods.push({'id': id, 'title': title, 'price': price, 'quantity': 1});
//       }
//     this.renderCart();
//   }

//   checkIfItemExists(id){
//     return this.goods.filter(item => item.id == id)[0] != undefined;
//   }

//   countCartPrice () {
//     return this.goods.reduce((total, item) => total + item.price * item.quantity, 0);
//   }

//   countCartQuantity() {
//     return this.goods.reduce((total, item) => total + item.quantity, 0);
//   }

//   clearCart() {
//     this.goods = [];
//     this.renderCart();
//   }

//   initCartHandler() {
//     document.querySelector('.products').addEventListener('click', (evt) => {
//         this.containerClickHandler(evt);
//     });
//   }

//   containerClickHandler(evt) {
//     if (evt.target.tagName !== 'BUTTON') return;
//     let id = evt.target.dataset.id;
//     let title = evt.target.dataset.title;
//     let price = evt.target.dataset.price;
//     this.addGoodToCart(id, title, price);
//   }
// }

// class CartItem {

//   constructor(id, title, price, quantity = 1){
//     this.id = id;
//     this.title = title;
//     this.price = price;
//     this.quantity = quantity;
//   }

//   renderCartItem() {
//     return `<div class="cart__item" data-id="${this.id}">
//             <div class="item__desc">
//                 <h3>${this.title}</h3>
//                 <p>${this.price} \u20bd</p>
//                 <button class="btn-minus">-</button>
//                 <span>${this.quantity}</span>
//                 <button class="btn-plus">+</button>
//                 <span>${this.countPrice}</span>
//                 <button class="btn-del">x</button>
//             </div>
//             </div>`;
//   }

//   increaseGoodQuantity() {
//     return this.quantity++;
//   }

//   decreaseGoodQuantity() {
//     return this.quantity--;
//   }

//   deleteGood() {

//   }

//   countPrice() {
//     return this.price * this.quantity
//   }
// }

// let cart = new Cart();
// cart.initCartHandler();