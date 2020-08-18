<template>
  <div class="container">
    <h2>当前用户: {{$store.state.user.name}}</h2>
    <img class="userHead" :src="$store.state.user.userHead">
    <h3 v-if="$store.state.user.isAdmin">用户类型: 管理员 <a class="h3a" href="/admin" target="_blank">进入后台管理页</a></h3>
    <h3 v-else>用户类型: 普通用户</h3>
    <div>
      <span>上传头像 --> </span><input type="file" name="file" @change="handleToUploadUserHead">
    </div>
    <p><a href="javascrip: void(0);" @click="handleToLogout">退出</a></p>
  </div>
</template>

<script>
import Axios from 'axios'
import { MessageBox } from 'mint-ui'

export default {
  name: 'Center',

  // 路由守卫
  beforeRouteEnter (to, from, next) {
    Axios.get('/ajax2/users/getUser').then((res) => {
      const status = res.data.status
      if (status === 0) {
        const username = res.data.data.username
        const isAdmin = res.data.data.isAdmin
        const userHead = res.data.data.userHead
        next(vm => {
          window.localStorage.setItem('username', username)
          window.localStorage.setItem('isAdmin', isAdmin)
          vm.$store.commit('user/USER_NAME', {
            name: username,
            isAdmin: isAdmin,
            userHead: userHead
          })
        })
      } else {
        next('/mine/login')
      }
    })
  },

  methods: {
    /** 退出登录 */
    handleToLogout () {
      Axios.get('/ajax2/users/logout').then((res) => {
        const status = res.data.status
        if (status === 0) {
          window.localStorage.removeItem('username')
          window.localStorage.removeItem('isAdmin')
          this.$store.commit('user/USER_NAME', {
            name: '',
            isAdmin: false
          })
          this.$router.push('/mine/login')
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    /** 上传头像 */
    handleToUploadUserHead (ev) {
      var file = ev.target.files[0]
      var param = new FormData()
      param.append('file', file, file.name)
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      Axios.post('/ajax2/users/uploadUserHead', param, config).then((res) => {
        var status = res.data.status
        if (status === 0) {
          MessageBox({
            title: '提示',
            message: '头像上传成功'
          }).then(() => {
            this.$store.commit('user/USER_NAME', {
              name: this.$store.state.user.username,
              isAdmin: this.$store.state.user.isAdmin,
              userHead: res.data.data.userHead + '?' + Math.random()
            })
          })
        } else {

        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
div {
  margin: 10px 0;
}
.container {
  padding: 10px;
}
.userHead {
  margin: 10px;
  width: 100px;
  height: 100px;
}
a {
  color: crimson;
  padding: 0 5px;
  border: 2px solid crimson;
  text-decoration: none;
}
</style>
