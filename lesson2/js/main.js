class ProductList {
    _goods;
    _allProducts;

    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods();
        this._render();
        this._countPrice();
    }

    _fetchGoods() {
        this._goods = [
            {id: 1, title: 'Notebook', price: 20000, quantity: 1},
            {id: 2, title: 'Mouse', price: 1500, quantity: 1},
            {id: 3, title: 'Keyboard', price: 5000, quantity: 1},
            {id: 4, title: 'Gamepad', price: 4500, quantity: 1},
        ];
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let product of this._goods) {
            const productObject = new ProductItem(product);
            console.log(productObject);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    _countPrice() {
        return this._goods.reduce((total, item) => total + item.price * item.quantity, 0)
    }
}

class ProductItem {
    constructor(product, img='https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
    }
}

const productList = new ProductList();

class Cart {
    goods;

    render() {

    }

    countCartPrice () {
        
    }

    countCartQuantity() {

    }

    clearCart() {

    }


}

class CartItem {
    good;

    render() {
        
    }

    increaseGoodQuantity() {

    }

    decreaseGoodQuantity() {

    }

    deleteGood() {

    }

    countPrice() {

    }
}