const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100',
        searchLine: '',
        cartItems: [],
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product);
            let find = this.cartItems.find(element => element.id_product === product.id_product);
            if (find) {
                find.quantity++;
            } else {
                let item = {
                    id_product: product.id_product,
                    product_name: product.product_name,
                    price: product.price,
                    quantity: 1
                };
                this.cartItems.push(item);
            }
        },
        removeProduct(product){
            console.log(product);
            let find = this.cartItems.find(element => element.id_product === product.id_product);
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                this.cartItems.splice(this.cartItems.indexOf(find), 1);
                document.querySelector(`.cart-item[data-id="${find.id_product}"]`).remove();
            }
          },
        filterGoods(searchLine){
            const regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
              const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
              if(!this.filtered.includes(el)){
                block.classList.add('invisible');
              } else {
                block.classList.remove('invisible');
              }
            })
        },
        isVisibleCart() {
            const cartBlock = document.querySelector('.cart-block');
            cartBlock.classList.toggle('invisible');
        },
        cartSum(){
            return this.cartItems.reduce((sum, item) => sum += item.price*item.quantity, 0);
        },
    },
    beforeCreate() {

    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
    },
    beforeMount() {

    },
    mounted() {

    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {

    },
    destroyed() {

    },
});
