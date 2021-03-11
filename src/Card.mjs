import { html, css, LitElement } from 'lit-element';

export class Card {
  constructor(id, productUrl, imageSrc, productTitle, price, width) {
    this.id = id;
    this.productUrl = productUrl;
    this.imageSrc = imageSrc;
    this.productTitle = productTitle;
    this.price = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price);
    this.width = width;
    this.element = this.generate();
  }

  render() {
    const imgStyle = css`
      height: 60%;
      max-width: 100%;
    `;
    const divStyle = css`
      height: '30%';
      textalign: 'center';
      display: 'flex';
      flexdirection: 'column';
      justifycontent: 'space-between';
    `;
    const h2Style = css`
      margin: 0px;
      font-weight: 100;
    `;

    return html`
      <a
        class="carousel_item"
        data-id="${this.id}"
        href="${this.productUrl}"
        target="_blank"
        style="${imgStyle}"
      >
        <img
          src="${this.imageSrc}"
          alt="${this.productTitle}"
          onerror="this.onerror=null;this.src='./img/logo.svg';"
          style="${imgStyle}"
        />
        <div class="details" style="${divStyle}">
          <h2 style="${h2Style}">${this.productTitle}</h2>
          <p>${this.price}</p>
        </div>
      </a>
    `;
  }
}
