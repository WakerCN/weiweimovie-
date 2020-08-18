<template>
  <div id="main">
    <Header title="个人中心"></Header>
    <div id="content">
      <router-view></router-view>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>

export default {
  name: 'Mine'
}
</script>

<style scoped>
</style>
