import Helpers from './Helpers.js'

export class Navigation {
  constructor(icon, name, parent) {
    this.icon = icon
    this.name = name
    this.parent = parent
    this.element
  }

  setDisabled(status) {
    if (status) {
      Helpers.setAttributes(this.element, {
        class: 'disabled'
      })
      Helpers.setStyles(this.element, {
        cursor: 'not-allowed',
        opacity: '0.7'
      })

    } else {
      this.element.classList.remove('disabled')
      Helpers.setStyles(this.element, {
        cursor: 'pointer',
        opacity: ''
      })
    }
  }

  render() {
    this.element = Helpers.createAndPopulate(
      'div',
      this.icon,
      {
        alt: this.name === 'prev'
          ? 'Previous item'
          : this.name === 'next'
            ? 'Next item'
            : this.name === 'play'
              ? 'Start auto scrolling'
              : 'Stop auto scrolling',
        title: this.name === 'prev'
          ? 'Scroll back to previous item'
          : this.name === 'next'
            ? 'Scroll forward to next item'
            : this.name === 'play'
              ? 'Start automatic scrolling'
              : 'Stop automatic scrolling',
        class: this.name
      },
      {
        position: 'absolute',
        fontSize: '3em',
        cursor: 'pointer',
      }
    )
    if(this.name === 'prev'){
      Helpers.setStyles(this.element, {
        top: '50%',
        transform: 'translateY(-50%)',
        left: 0
      })
    }
    if(this.name === 'next'){
      Helpers.setStyles(this.element, {
        top: '50%',
        transform: 'translateY(-50%)',
        right: 0
      })
    }
    if(this.name === 'play'){
      Helpers.setStyles(this.element, {
        left: '50%',
        transform: 'translateX(-50%)',
        top: 0
      })
    }
    if(this.name === 'stop'){
      Helpers.setStyles(this.element, {
        left: '50%',
        transform: 'translateX(-50%)',
        top: 0,
        display: 'none'
      })
    }
    this.parent.element.appendChild(this.element)
    if(this.name === 'prev' || this.name === 'next') {
      this.element.addEventListener(
        'click',
        function () {
          if (!this.element.classList.contains('disabled')) {
            this.parent.disableNav()
            this.parent.sendDirection(this.name)
          }
        }.bind(this)
      )
    }
    if(this.name === 'play') {
      this.element.addEventListener(
        'click',
        function () {
          this.parent.play()
        }.bind(this)
      )
    }
    if(this.name === 'stop') {
      this.element.addEventListener(
        'click',
        function () {
          this.parent.stop()
        }.bind(this)
      )
    }
  }
  show() {
    Helpers.setStyles(this.element, {
      display: 'unset'
    })
  }
  hide() {
    Helpers.setStyles(this.element, {
      display: 'none'
    })
  }
}