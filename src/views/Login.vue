<template>
  <div class="l-container">
    <div class="l-title">欢迎登入</div>
    <div class="l-logo">
      <img src="../assets/title_logo.jpg" />
    </div>
    <!-- 登入 -->
    <van-form  class="l-form" v-show="isRegister">
      <van-cell-group inset>
        <van-field
          v-model="formData.account"
          name="用户名"
          class="iconfont icon-zhanghaoquanxianguanli"
          input-align="right"
          placeholder="请输入邮箱/手机号"
        >
        </van-field>
        <van-field
          v-model="formData.password"
          type="password"
          name="密码"
          class="iconfont icon-mima1"
          input-align="right"
          placeholder="请输入密码"
        />
      </van-cell-group>
      <div class="l-register">
        <p v-show="isRegister" @click="registerOrLogin">没有账号？点我注册</p>
      </div>
      <div style="margin: 16px">
        <van-button round block type="primary" @click="submit">
          登入
        </van-button>
      </div>
    </van-form>
    <!-- 注册 -->
    <van-form  class="l-form" v-show="!isRegister">
      <van-cell-group inset>
        <van-field
          v-model="formData.account"
          name="用户名"
          class="iconfont icon-zhanghaoquanxianguanli"
          input-align="right"
          placeholder="请输入邮箱/手机号"
          :rules="accountRules"
        >
        </van-field>
        <van-field
          v-model="formData.authCode"
          center
          clearable
          class="iconfont icon-duanxin"
          input-align="right"
          placeholder="请输入验证码"
        >
          <template #button>
            <van-button @click="sendAuthCode" class="l-msg-btn" size="mini"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <van-field
          v-model="formData.password"
          type="password"
          name="密码"
          class="iconfont icon-mima1"
          input-align="right"
          placeholder="请输入密码"
          :rules="passwordRules"
        />
        <van-field
          v-model="formData.confirmPassword"
          type="password"
          name="密码"
          class="iconfont icon-mima1"
          input-align="right"
          placeholder="请再次输入密码"
          :rules="confirmPasswordRules"
        />
      </van-cell-group>
      <div class="l-register">
        <p v-show="!isRegister" @click="registerOrLogin">已有账号？点我登入</p>
      </div>
      <div style="margin: 16px">
        <van-button round block type="primary" @click="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { sendEmailCode } from '@/api/user'
const isRegister = ref(true);
const router = useRouter();
const store = useStore();
const formData = reactive({
  account: "2687669185@qq.com",
  password: "1234567",
  confirmPassword: "",
  authCode: "",
});
// 清空表单
const clearForm = () => {
  formData.account = "";
  formData.password = "";
  formData.confirmPassword = "";
  formData.authCode = "";
};
const phoneReg = /^1[3-9]\\d{9}$/; // 匹配手机号
const emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // 匹配电子邮件地址
// 表单校验
const accountRules = [
  {
    require: true,
    message: "账号不能为空",
    trigger: "onblur",
  },
  {
    validator: (value) => {
      return phoneReg.test(value) || emailReg.test(value);
    },
    message: "请输入正确格式的账号",
    trigger: "onblur",
  },
];

const passwordRules = [
  { required: true, message: "请填写密码", trigger: "onblur" },
  {
    validator: (value) => {
      return value.length > 6;
    },
    message: "密码格式错误",
    trigger: "onBlur",
  },
];

const confirmPasswordRules = [
  { required: true, message: "请再次输入密码" },
  {
    validator: (value) => {
      return value === formData.password;
    },
    message: "两次输入密码不一致",
    trigger: "onBlur",
  },
];
// 发送验证码
const sendAuthCode = () => {
  sendEmailCode(formData.account).then((res)=>{
    if(res.code === 20000){
      console.log('发送成功')
    }else {
      console.log('发送失败')
    }
  }).catch((error)=>{
    console.log(error)
  })
};
// 注册/登入 页面转换
const registerOrLogin = () => {
  clearForm();
  if (isRegister.value) {
    isRegister.value = false;
  } else {
    isRegister.value = true;
  }
};
// 表单提交
const submit = (values) => {
  if (isRegister.value) {
    // 登入
    store.dispatch('login', formData);
    router.push("/");
  } else {
    // 注册
    store.dispatch('register',formData)
    console.log("注册");
  }
};
</script>

<style lang="less" scoped>
.l-container {
  height: 100vh;

  text-align: center;
  background-color: rgb(230, 128, 128);
  .l-title {
    font-size: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
  }
  .l-logo {
    img {
      width: 10rem;
      height: 10rem;
      border-radius: 50% 50%;
    }
  }
  .l-form {
    margin-top: 2rem;
    .l-msg-btn {
      height: 1.6rem;
      font-size: xx-small;
      background-color: skyblue;
      color: white;
      font-weight: bold;
    }
  }
  .l-register {
    text-align: right;
    padding-top: 0.5rem;
    padding-right: 1rem;
    p {
      color: rgb(109, 54, 54);
    }

    text-decoration: underline;
  }
}
</style>