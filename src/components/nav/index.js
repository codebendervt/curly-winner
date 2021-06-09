

const updateNav = (e, name, oldValue, newValue) => {

    //console.log(e)
    console.log(name)
    console.log(oldValue)

    document.title = newValue
}



class HeaderNav extends HTMLElement {

    static get observedAttributes() { return ['data-title']; }


    constructor() {
        // Always call super first in constructor
        super();

        let style = document.querySelector('link[rel="stylesheet"]');
        // let template = document.querySelector('link[rel="import"]').import;
        let template = document.getElementById('nav');

     
        let templateContent = template.content;

       

      
        // Create a shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' }).appendChild(templateContent.cloneNode(true));
        // this.shadowRoot.append(style)
        // Create a shadow root
         //shadowRoot.append(style);
        // console.log(shadowRoot)
        // // write element functionality in here
        // const wrapper = document.createElement('div');
        // wrapper.setAttribute('class', 'nav');
        // document.title = this.getAttribute('data-title')

        // // Create some CSS to apply to the shadow dom
        // //   const style = document.createElement('style');
        // //   style.textContent = '.wrapper {' +
        // //   // CSS truncated for brevity

        // // attach the created elements to the shadow DOM
        // this.shadowRoot.append(wrapper);


    }


    connectedCallback() {
        console.log('nav head has been added');
        // updateStyle(this);
    }

    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.');
        updateNav(this, name, oldValue, newValue);


    }
}
customElements.define('nav-header', HeaderNav);



const slottedSpan = document.querySelector('title');

console.log(slottedSpan.assignedSlot);
console.log(slottedSpan.slot);


