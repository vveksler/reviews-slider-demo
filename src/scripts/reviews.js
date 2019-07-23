import Vue from 'vue'
import Flickity from 'vue-flickity'

const review = {
  template: '#review-template',
  props: {
    review: Object
  }
}

new Vue({
  el: '#reviews',
  template: '#reviews-template',
  components: {
    Flickity,
    review
  },
  data: {
    reviews: [],
    flickityOptions: {
      initialIndex: 0,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: false,
      groupCells: true

      // any options from Flickity can be used
    },
    currentIndex: 0
  },
  watch: {
    currentIndex() {
      console.log(this.currentIndex)
      console.log(this.reviews.length)
    }
  },
  methods: {
    makeArrWithRequiredImages(data) {
      return data.map((item) => {
        const requiredPic = require(`../images/content/${item.avatar}`)
        item.avatar = requiredPic

        return item
      })
    },
    checkWidth(direction) {
      if (window.innerWidth <= 480) {
        direction === 'next' ? this.currentIndex++ : this.currentIndex--
      } else {
        direction === 'next'
          ? (this.currentIndex = this.currentIndex + 2)
          : (this.currentIndex = this.currentIndex - 2)
      }
    },
    next() {
      this.checkWidth('next')

      if (this.currentIndex >= this.reviews.length)
        this.currentIndex = this.reviews.length - 2

      this.$refs.flickity.next()
    },

    previous() {
      this.checkWidth('prev')

      if (this.currentIndex <= 0) this.currentIndex = 0

      this.$refs.flickity.previous()
    }
  },
  created() {
    const data = require('../data/reviews.json')
    this.reviews = this.makeArrWithRequiredImages(data)
  }
})
