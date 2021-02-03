class Hamburger {
    params = {
        sizeSmall: {param: "sizeSmall", price: 50, calorie: 20},
        sizeBig: {param: "sizeBig", price: 100, calorie: 40},
        stuffingCheese: {param: "stuffingCheese", price: 10, calorie: 20},
        stuffingSalad: {param: "stuffingSalad", price: 20, calorie: 5},
        stuffingPotato: {param: "stuffingPotato", price: 15, calorie: 5},
        toppingSpice: {param: "toppingSpice", price: 15, calorie: 0},
        toppingMayonnaise: {param: "toppingMayonnaise", price: 20, calorie: 5}
    };
    sumPrice = 0;
    sumCalories = 0;

    constructor(formId) {
        this.form = document.getElementById(formId);
    }

    getValuesForm() {
        this.size = this.form.size.value;
        this.stuff = this.form.stuff.value;
        this.toppings = this.form.querySelectorAll("[name=toppings]:checked");
    }

    calculate(event) {
        this.getValuesForm();

        this.sumPrice = this.params[this.size].price + this.params[this.stuff].price;
        this.sumCalories = this.params[this.size].calorie + this.params[this.stuff].calorie;
        let adds = this.toppings;
        for (let e of adds) {
            this.sumPrice += this.params[e.value].price;
            this.sumCalories += this.params[e.value].calorie;
        }
        this.render();
    }

    render() {
        this.form.querySelector("#price").textContent = this.sumPrice;
        this.form.querySelector("#calories").textContent = this.sumCalories;
    }

    init() {
        for (let e of this.form.querySelectorAll("[name=size],[name=stuff],[name=toppings]")) {
            e.addEventListener("click", event => this.calculate(event));
        }
        this.calculate();
    }
}

let burgerCalc = new Hamburger("form");
burgerCalc.init();