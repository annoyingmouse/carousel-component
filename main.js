import {Carousel} from './js/Carousel.js'
const carousels = document.querySelectorAll('.carousel')
carousels.forEach(carousel => {
  // Inspired by https://www.cssscript.com/demo/infinite-multi-slide-elder-carousel/
  new Carousel(carousel).init()
})
