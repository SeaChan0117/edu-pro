<template>
  <div class="login">
    <el-form
      class="login-form"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <H1 class="edu-boss-title">Edu boss管理系统</H1>
      <el-divider></el-divider>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onSubmit"
          :loading="isLogin"
        >
          登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-back"
          @click="goClient"
          style="width: 100%"
        >
          回到 用户端
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '15510792995',
        password: '111111'
      },
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 18,
            message: '长度为 6 到 18 个字符',
            trigger: 'blur'
          }
        ]
      },
      isLogin: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 表单验证
        await (this.$refs.form as Form).validate()

        // 验证通过 --> 提交表单
        this.isLogin = true
        const { data } = await login(this.form)

        // 处理请求结果
        if (data.state !== 1) {
          // 失败 --> 给出提示
          this.$message.error(data.message)
        } else {
          // 登录成功，记录登录状态，状态需要能够全局访问（放到 Vuex 中)
          this.$store.commit('setUser', data.content)
          // 然后在访问需要登录需要判断有没有登录状态（路由拦截器）
          // 成功 --> 跳转目标页面或者首页
          this.$router.push(this.$route.query.redirect as string || '/')
          this.$message.success('登录成功！')
        }
      } catch (e) {
        console.log('login failed', e)
      }

      this.isLogin = false
    },
    goClient () {
      window.open('http://edufront.lagou.com/', '_self')
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00b38a;
  background-image: url("../../assets/loginbg.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: auto 112px;

  .login-form {
    width: 300px;
    background: #ffffff;
    padding: 20px;
    border-radius: 5px;

    .edu-boss-title {
      text-align: center;
      color: rgba(0, 0, 0, .5);
      transition: text-shadow .3s;
      font-size: 3rem;
    }
  }

  .login-btn {
    width: 100%;
  }
}
</style>
