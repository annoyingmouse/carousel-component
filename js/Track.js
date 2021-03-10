import Helpers from './Helpers.js'
import {Card} from './Card.js'

export class Track {
  constructor(third, parent, transition = 500) {
    this.third = third
    this.parent = parent
    this.transition = transition
    this.element = Helpers.createAndPopulate(
      'div',
      null,
      {
        class: 'carousel_track'
      },
      {
        height: '100%',
        transition: `transform ${transition}ms ease 0s`,
        transform: `translateX(${-Math.abs(third * 6)}px)`
      }
    )
    this.current = this.data
    this.min = null
    this.max = null
    this.children = []
  }

  addData(data) {
    this.data = [...data.slice(-3), ...data, ...data.slice(0, 3)]
    this.element.style.width = `${this.data.length * this.third}px`
    this.max = -Math.abs((this.data.length - 3) * this.third)
    this.current = -Math.abs(this.third * 6)
    this.min = -Math.abs(3 * this.third)

    this.data.forEach(product => {
      const card = new Card(
        product.id,
        product.productUrl,
        product.imageSrc,
        product.productTitle,
        product.price,
        this.third
      )
      this.element.appendChild(card.element)
      this.children.push(card)
    })
  }

  scroll(direction) {
    this.current =
      direction === 'prev'
        ? this.current + this.third
        : this.current - this.third
    this.element.style.transform = `translateX(${this.current}px)`
    setTimeout(
      function () {
        if (
          this.current > this.min - 10 ||
          this.current < this.max + 10
        ) {
          this.element.style.transition = 'none'
          this.current = this.current > this.min - 10
            ? this.max
            : this.min
          this.element.style.transform = `translateX(${this.current}px)`
          setTimeout(
            function () {
              this.element.style.transition = `transform ${this.transition}ms ease 0s`
              this.parent.enableNav()
            }.bind(this),
            this.transition / 10
          )
        }else{
          this.parent.enableNav()
        }
      }.bind(this),
      this.transition
    )
  }

  resize(third){
    Helpers.setStyles(this.element, {
      transition: 'none'
    })
    const current = third * Math.round(this.current / this.third)
    this.children.forEach(child => child.resize(third))
    this.max = -Math.abs((this.data.length - 3) * third)
    this.min = -Math.abs(3 * third)
    Helpers.setStyles(this.element, {
      width: `${this.data.length * third}px`,
      transform: `translateX(${current}px)`
    })
    this.third = third
    this.current = current
    setTimeout(
      function () {
        Helpers.setStyles(this.element, {
          transition: `transform ${this.transition}ms ease 0s`
        })
      }.bind(this),
      this.transition / 10
    )
  }
}
