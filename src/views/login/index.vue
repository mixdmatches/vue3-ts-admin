<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
          <el-form ref="loginForms" :model="loginForm" :rules="rules" class="login_form">
            <h1>hello</h1>
            <h2>欢迎登录</h2>
            <el-form-item prop="username">
              <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input showPassword v-model="loginForm.password" type="password" :prefixIcon="Lock"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
//引入获取当前时间得函数
import { getTime } from '@/utils/time';
import { User, Lock } from '@element-plus/icons-vue'
import { reactive,ref } from 'vue';
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user';
import { useRouter,useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
const $router = useRouter()
const $route = useRoute()
const useStore = useUserStore();
//获取form表单组件
const loginForms = ref()
let loginForm = reactive({
  username: 'admin',
  password: '111111'
})
let loading = ref(false)
//登录按钮回调
const login = async () => {
  //保证全部的表单项全部通过校验
  await loginForms.value.validate();
  loading.value = true;
  console.log(loginForm);
  //通知仓库发登录请求
  //请求成功跳转首页
  //请求失败提示错误信息
  try {
    await useStore.userLogin(loginForm);
    //判断登陆时路径中是否有query参数，如果有就往query参数跳转，没有就跳转首页
    let redirect = $route.query.redirect
    //编程式导航跳转
    $router.push({path:redirect||'/'})
    //登陆成功提示消息
    ElNotification({
      title: `hi,${getTime()}好`,
      message: '欢迎您',
      type: 'success'
    })
    loading.value = false;

  } catch (error) {
    loading.value = false;
    ElNotification({
      message: error.message,
      type: 'error'
    })
  }
}
//定义自定义的校验规则
/**
 * rule:校验规则
 * value:当前输入的值
 * callback:回调函数
 */
const validatorUsername = (rule,value,callback)=>{
  if(/^\d{5,10}$/.test(value)){
    callback()
  }else{
    callback(new Error('用户名必须为5到10位数字'))
  }
}
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min:4,max:10,message:'用户名长度在4到10之间',trigger:'blur'}
    // {trigger:"change",validator:validatorUsername}
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min:6,max:12,message:'密码长度在6到12之间',trigger:'blur'}
  ]
})
</script>

<style lang="scss" scoped>
.login_container{
  width: 100%;
  height: 100vh;
  background:url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
      width: 80%;
      z-index: 99;
      h1,
      h2 {
        color: white;
      }
    }
}
</style>