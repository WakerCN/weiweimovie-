<template>
  <div class="register_body">
    <div class="register_email">
      邮箱: <input type="text" v-model="email" class="register_text"> <button @click="handleToVerify" :disabled="disabled">{{ verifyInfo }}</button>
    </div>
    <div>
      验证码: <input type="text" v-model="verify" class="register_text">
    </div>
    <div>
      用户名: <input type="text" v-model="username" class="register_text">
    </div>
    <div>
      密码: <input type="password" v-model="password" class="register_text">
    </div>
    <!-- <div>
      确认密码: <input type="password" class="register_text">
    </div> -->
    <div class="register_btn">
      <input type="submit" value="注册" @click="handleToRegister"/>
    </div>
    <div class="register_link">
      <router-link to="/mine/login">登录</router-link>
      <router-link to="/mine/findPassword">找回密码</router-link>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import { MessageBox } from 'mint-ui'

export default {
  name: 'Register',

  data () {
    return {
      email: '',
      username: '',
      password: '',
      verify: '',
      verifyInfo: '发送验证码',
      disabled: false
    }
  },

  methods: {
    /** 发送验证码 */
    handleToVerify () {
      if (this.disabled) { return }
      Axios.get(`/ajax2/users/verify?email=${this.email}`).then((res) => {
        const status = res.data.status
        if (status === 0) {
          MessageBox({
            title: '提示',
            message: '验证码发送成功',
            showConfirmButton: true
          }).then(() => {
            this.countDown()
          }).catch((err) => {
            console.log(err)
          })
        } else {
          MessageBox({
            title: '提示',
            message: '验证码发送失败',
            showConfirmButton: true
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    /** 点击注册按钮进行注册 */
    handleToRegister () {
      Axios.post('/ajax2/users/register', {
        email: this.email,
        username: this.username,
        password: this.password,
        verify: this.verify
      }).then((res) => {
        const status = res.data.status
        if (status === 0) {
          MessageBox({
            title: '提示',
            message: '注册成功',
            showConfirmButton: true
          })
          this.$router.push('/mine/login')
        } else {
          MessageBox({
            title: '提示',
            message: res.data.msg + '，请重新注册',
            showConfirmButton: true
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    /** 验证码倒计时 */
    countDown () {
      this.disabled = true
      var count = 60
      var timer = setInterval(() => {
        this.verifyInfo = '剩余' + count + 'S'
        count--
        if (count === -2) {
          this.disabled = false
          count = 60
          this.verifyInfo = '发送验证码'
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
#content .register_body {
  width: 100%;
}
#content .register_body > div {
  padding: 5px;
}
.register_body .register_email {
  position: relative;
}
.register_body .register_email button {
  position: absolute;
  padding: 5px;
  right: 5%;
  top: 60%;
  border: none;
  outline: none;
  border-radius: 5px;
  transform: translate(0, -50%);
}
.register_body .register_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.register_body .register_btn {
  height: 50px;
  margin: 10px;
}
.register_body .register_btn input {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.register_body .register_link {
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
.register_body .register_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
</style>
