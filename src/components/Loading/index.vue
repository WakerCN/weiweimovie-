<template>
  <div class="container">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
/*
 * Loading Dots
 * Can we use pseudo elements here instead :after?
 */
.loading span {
  display: inline-block;
  vertical-align: middle;
  width: 0.6em;
  height: 0.6em;
  margin: 0.19em;
  background: #007db6;
  border-radius: 0.6em;
  animation: loading 1s infinite alternate;
}

/*
 * Dots Colors
 * Smarter targeting vs nth-of-type?
 */
.loading span:nth-of-type(2) {
  background: #008fb2;
  animation-delay: 0.2s;
}
.loading span:nth-of-type(3) {
  background: #009b9e;
  animation-delay: 0.4s;
}
.loading span:nth-of-type(4) {
  background: #00a77d;
  animation-delay: 0.6s;
}
.loading span:nth-of-type(5) {
  background: #00b247;
  animation-delay: 0.8s;
}
.loading span:nth-of-type(6) {
  background: #5ab027;
  animation-delay: 1s;
}
.loading span:nth-of-type(7) {
  background: #a0b61e;
  animation-delay: 1.2s;
}

/*
 * Animation keyframes
 * Use transition opacity instead of keyframes?
 */
@keyframes loading {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
