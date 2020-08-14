<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  props: ['slidesPerView'],
  mounted () {
    // Initialize Swiper
    // eslint-disable-next-line no-new
    new Swiper('.swiper-container', {
      slidesPerView: this.slidesPerView,
      spaceBetween: 30
    })
  }
}
</script>

<style scoped>

</style>
