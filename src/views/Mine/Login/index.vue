<template>
  <div class="login_body">
    <div>
      <input v-model="username" class="login_text" type="text" placeHolder="账户名">
    </div>
    <div>
      <input v-model="password" class="login_text" type="password" placeHolder="请输入您的密码" autocomplete>
    </div>
    <div>
      <input v-model="verifyImg" class="login_text" type="text" placeHolder="验证码">
      <img src="/ajax2/users/verifyImg" style="margin-left: 10px" @click="handleChangeVerifyImg">
    </div>
    <div class="login_btn">
      <input type="submit" value="登录" @click="handleToLogin">
    </div>
    <div class="login_link">
      <router-link to="/mine/register">立即注册</router-link>
      <router-link to="/mine/findPassword">找回密码</router-link>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import { MessageBox } from 'mint-ui'

export default {
  name: 'Login',

  data () {
    return {
      username: '',
      password: '',
      verifyImg: ''
    }
  },

  methods: {
    /** 登录 */
    handleToLogin () {
      Axios.post('/ajax2/users/login', {
        username: this.username,
        password: this.password,
        verifyImg: this.verifyImg
      }).then(res => {
        const status = res.data.status
        if (status === -1) {
          MessageBox({
            title: '提示',
            message: '登录失败，请重新输入密码'
          })
        } else if (status === 0) {
          MessageBox({
            title: '提示',
            message: '登录成功'
          }).then((action) => {
            this.$router.push('/mine/center')
          })
        } else if (status === -2) {
          MessageBox({
            title: '提示',
            message: '账号已冻结'
          })
        } else if (status === -3) {
          MessageBox({
            title: '提示',
            message: res.data.msg
          })
        }
      })
    },

    /** 刷新图形验证码 */
    handleChangeVerifyImg (ev) {
      ev.target.src = '/ajax2/users/verifyImg?' + Math.random()
    }
  }
}
</script>

<style scoped>
#content .login_body {
  width: 100%;
}
.login_body .login_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.login_body .login_btn {
  height: 50px;
  margin: 10px;
}
.login_body .login_btn input {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.login_body .login_link {
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
.login_body .login_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
</style>
