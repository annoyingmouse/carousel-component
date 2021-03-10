import Helpers from './Helpers.js'

export class Card {
  constructor(id, productUrl, imageSrc, productTitle, price, width) {
    this.id = id
    this.productUrl = productUrl
    this.imageSrc = imageSrc
    this.productTitle = productTitle
    this.price = this.formatter(price)
    this.width = width
    this.element = this.generate()
  }

  formatter(value) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(value)
  }

  generate() {
    const anchor = Helpers.createAndPopulate(
      'a',
      null,
      {
        class: 'carousel_item',
        dataId: this.id,
        href: this.productUrl,
        target: '_blank',
        style: `width:${this.width}px; height: 100%`
      },
      {
        float: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textDecoration: 'none',
      }
    )
    anchor.appendChild(Helpers.createAndPopulate(
      'img',
      null,
      {
        src: this.imageSrc,
        alt: this.productTitle,
        onerror: `this.onerror=null;this.src='./img/logo.svg';`
      },
      {
        height: '60%',
        maxWidth: '100%'
      }
    ))

    const div = Helpers.createAndPopulate(
      'div',
      null,
      {
        class: 'details'
      },
      {
        height: '30%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: 'darkgrey'
      }
    )
    anchor.appendChild(div)

    const h2 = Helpers.createAndPopulate(
      'h2',
      this.productTitle,
      null,
      {
        margin: '0',
        fontWeight: '100',
        fontSize: `${(1.5/350) * this.width}em`
      }
    )
    div.appendChild(h2)

    const p = Helpers.createAndPopulate(
      'p',
      this.price,
      null,
      {
        fontSize: `${(1/350) * this.width}em`
      }
    )
    div.appendChild(p)

    return anchor
  }
  resize(width) {
    Helpers.setStyles(this.element, {
      width: `${width}px`
    })
    // font-size: 1.5em; works really well in a card with a width of 350px
    Helpers.setStyles(this.element.querySelector('h2'), {
      fontSize: `${(1.5/350) * width}em`
    })
    // font-size: 1em; works really well in a card with a width of 350px
    Helpers.setStyles(this.element.querySelector('p'), {
      fontSize: `${(1/350) * width}em`
    })
  }
}