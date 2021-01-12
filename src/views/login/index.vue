<template>
  <div class="login-container">
    <div class="login-form-wrap">
    <div class="login-head">
      <div class="logo"></div>
    </div>
    <el-form class="login-form" :model="user" :rules="rules" ref="login-from">
      <el-form-item prop="mobile">
        <el-input type="input" v-model="user.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="code" v-model="user.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="chekbox" prop='agree'>
        <el-checkbox v-model="user.agree"> 我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="onLogin" :loading="loginLoading">登陆</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: true
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              // console.log(value)
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议!'))
              }
            },
            trigger: 'change'
          }
        ]
      },
      // checked: false,
      loginLoading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onLogin () {
      // 进行验证
      this.$refs['login-from'].validate((vaild, err) => {
        // 没有验证通过，请求登陆
        if (!vaild) {
          return
        }
        // 验证通过
        this.login()
      })
    },
    login () {
      // 获取表单中的数据
      // const user = this.user
      // 验证通过提交表单
      this.loginLoading = true
      login(this.user).then(res => {
        // console.log(res)
        // 登陆成功处理
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
        // 关闭loading
        this.loginLoading = false
        // 将接口返回的用户相关数据储存在本地存储中
        // const tokenUser = JSON.stringify(res.data.data)
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // 路由跳转首页
        this.$router.push('/')
      }).catch(err => {
        console.log('登陆失败', err)
        // 登陆失败处理
        this.$message.error('登录失败，手机号或验证码错误')
        this.loginLoading = false
      })
    }
  },
  created () {},
  mounted () {}
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: fixed;
  background: url(./login_bg.jpg) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url(./logo_index.png) no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .chekbox {
        text-align: left;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
