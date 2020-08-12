<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'BScroller',

  data () {
    return {
      scroller: null
    }
  },

  mounted () {
    this.scroller = new BScroll('.wrapper', {
      scrollbar: {
        fade: true
      },
      tap: true,
      probeType: 1
    })
  },

  methods: {
    jumpToElement (elem) {
      this.scroller.scrollToElement(elem)
    }
  }
}
</script>

<style scoped>
.wrapper{
  height: 100%;
}
</style>
