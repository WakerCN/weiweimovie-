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

  props: {
    pullDownRefresh: {
      type: Function,
      default: () => { }
    },
    pullUpLoad: {
      type: Function,
      default: () => { }
    }
  },

  mounted () {
    var scroller = new BScroll('.wrapper', {
      scrollbar: {
        fade: true
      },
      tap: true,
      probeType: 1,
      pullDownRefresh: {
        threshold: 30, // 下拉距离超过30px触发pullingDown事件
        stop: 20 // 回弹停留在距离顶部20px的位置
      },
      pullUpLoad: {
        threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
      }
    })
    this.scroller = scroller

    scroller.on('pullingDown', () => {
      this.pullDownRefresh()
      this.scroller.finishPullDown()
    })

    scroller.on('pullingUp', () => {
      this.pullUpLoad()
      this.scroller.finishPullDown()
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
