import {Navigation} from "./Navigation.js"
import {Track} from "./Track.js"
import Helpers from "./Helpers.js"

export class Carousel {
  constructor(element, data = null, third) {
    this.third = third 
      ? third
      : Math.floor(element.clientWidth / 3)
    this.transition = 600
    this.element = element
    this.data = data
    this.nav = {
      prev: new Navigation('⬅️', 'prev', this, true),
      next: new Navigation('➡️', 'next', this),
      play: new Navigation('▶️', 'play', this),
      stop: new Navigation('⏹️', 'stop', this)
    }
    this.track = new Track(this.third, this, this.transition)
    this.autoScroll = null
  }

  init() {
    this.element.appendChild(this.track.element)
    this.initKeyboardListener()
    this.initData()
    Helpers.setStyles(this.element, {
      height: `${this.third}px`,
      overflow: 'hidden',
      position: 'relative'
    })

    /*
     * Listen to window resize and respond appropriately
     * Especially in terms of telling the track, and the 
     * track telling its children, to respond
     **/ 
    window.addEventListener('resize', function(){
      const third = Math.floor(this.element.clientWidth / 3)  
      this.third = third
      Helpers.setStyles(this.element, {
        height: `${third}px`
      })
      this.track.resize(third)
    }.bind(this), false)

    // Annoying default behaviour of the browser...
    this.element.addEventListener('focus', function() {
      Helpers.setStyles(this.element, {
        outline: 'none'
      })
    }.bind(this))

    for (const button in this.nav) {
      this.nav[button].render()
    }
  }

  initKeyboardListener() {
    Helpers.setAttributes(this.element, {
      tabindex: 0
    })
    this.element.addEventListener('keyup', event => {
      if (event.isComposing || event.keyCode === 229) {
        return
      } else {
        if (event.keyCode === 37) {
          this.nav.prev.element.click()
        }
        if (event.keyCode === 39) {
          this.nav.next.element.click()
        }
      }
    })
  }

  initData() {
    if (!this.data) {
      this.data = this.element.dataset.source
    }
    fetch(this.data)
      .then(response => response.json())
      .then(data => {
        this.track.addData(data.productData)
      })
  }

  /*
   * Sibling to sibling communication via parent - not ideal,
   * but who wants a message bus?
   **/
  disableNav() {
    this.nav.prev.setDisabled(true)
    this.nav.next.setDisabled(true)
  }
  enableNav() {
    this.nav.prev.setDisabled(false)
    this.nav.next.setDisabled(false)
  }
  sendDirection(direction) {
    this.track.scroll(direction)
  }
  play() {
    this.nav.next.element.click()
    this.nav.play.hide()
    this.nav.stop.show()
    this.autoScroll = setInterval(function() {
      this.nav.next.element.click()
    }.bind(this), this.transition * 6)
  }
  stop() {
    this.nav.play.show()
    this.nav.stop.hide()
    clearInterval(this.autoScroll);
  }
}
