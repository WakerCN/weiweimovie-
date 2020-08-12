<template>
  <div id="main">
    <Header title="个人中心"></Header>
    <div id="content">
      <Login></Login>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Login from '../../views/Mine/Login'

export default {
  name: 'Mine',
  components: {
    Login
  }
}
</script>

<style scoped>
</style>
