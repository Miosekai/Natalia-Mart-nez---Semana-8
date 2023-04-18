import getData from "../../json.js";

let list = [];


class firstComponent extends HTMLElement {
    static get observedAttributes() {
        return ['class']
    }
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        })
    }
    connectedCallback() {
        this.printData();
    }
    attributeChangeCallback(propName, oldValue, newValue) {
        this[propName] = newValue;
        this.printData();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./components/firstComponent/componentExample.css">
        <div class="card-wrapper" id="cards">
        </div>
        `
        let card = this.shadowRoot.getElementById("cards");
        console.log(card);
        list.forEach((item) => {
            console.log(item)
            card.innerHTML += `            
                <app-card 
                    name="${item.name}" 
                    type="${item.type}" 
                    url="${item.url}" 
                    description="${item.description}" 
                    price="${item.price}">
                </app-card>      
            `
        })


    }

    printData() {
        getData().then((a) => {
            list = a
            this.render()
        })

    }


}
customElements.define("app-header", firstComponent);
export default firstComponent;