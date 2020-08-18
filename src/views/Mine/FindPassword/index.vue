<template>
  <div class="findPassword_body">
    <div class="findPassword_email">
      邮箱: <input type="text" v-model="email" class="findPassword_text"> <button @click="handleToVerify">发送验证码</button>
    </div>
    <div>
      验证码: <input type="text" v-model="verify" class="findPassword_text">
    </div>
    <div>
      新密码: <input type="password" v-model="password" class="findPassword_text">
    </div>
    <div class="findPassword_btn">
      <input type="submit" value="修改密码" @click="handleToUpdatePwd">
    </div>
    <div class="findPassword_link">
      <router-link to="/mine/login">立即登录</router-link>
      <router-link to="/mine/register">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import { MessageBox } from 'mint-ui'

export default {
  name: 'FindPassword',

  data () {
    return {
      email: '',
      password: '',
      verify: ''
    }
  },

  methods: {
    /** 发送验证码 */
    handleToVerify () {
      Axios.get(`/ajax2/users/verify?email=${this.email}`).then((res) => {
        const status = res.data.status
        if (status === 0) {
          MessageBox({
            title: '提示',
            message: '验证码发送成功',
            showConfirmButton: true
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

    /** */
    handleToUpdatePwd () {
      Axios.post('/ajax2/users/findPassword', {
        email: this.email,
        password: this.password,
        verify: this.verify
      }).then((res) => {
        const status = res.data.status
        if (status === -1) {
          MessageBox({
            title: '提示',
            message: '修改密码失败: ' + res.data.msg
          })
        } else {
          MessageBox({
            title: '提示',
            message: '修改密码成功'
          })
          this.$router.push('/mine/login')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#content .findPassword_body {
  width: 100%;
}
#content .findPassword_body > div {
  padding: 5px;
}
.findPassword_body .findPassword_email {
  position: relative;
}
.findPassword_body .findPassword_email button {
  position: absolute;
  padding: 5px;
  right: 5%;
  top: 60%;
  border: none;
  outline: none;
  border-radius: 5px;
  transform: translate(0, -50%);
}
.findPassword_body .findPassword_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.findPassword_body .findPassword_btn {
  height: 50px;
  margin: 10px;
}
.findPassword_body .findPassword_btn input {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.findPassword_body .findPassword_link {
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
.findPassword_body .findPassword_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
</style>
