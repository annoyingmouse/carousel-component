import { Carousel } from "./js/Carousel.js"

const template = document.createElement('template')

template.innerHTML = `
  <style>
    div {
      font-family: Arial, Helvetica, sans-serif;
      color: darkgrey;
    }
  </style>
  <div></div>
`

export class CarouselComponent extends HTMLElement {
  static get observedAttributes() {
    return ['source'];
  }
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'closed'
    });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.element = shadowRoot.querySelector('div')
    const third = this.element.clientWidth / 3
    new Carousel(this.element, this.source, third).init()
  }
  get source() {
    return this.getAttribute('source');
  }
}

window.customElements.define('carousel-comp', CarouselComponent);