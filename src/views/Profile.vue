<template>
  <div class="line-profile">
    <van-form>
      <van-field
      v-model="formData.email"
      name="email"
      center
      clearable
      label="短信验证码"
      placeholder="请输入短信验证码"
    >
      <template #button>
        <van-icon @click="edit($event)" name="edit" size="larger"></van-icon>
      </template>
    </van-field>
      <van-cell-group inset>
        <van-field
          v-model="formData.avatar"
          name="avatar"
          label="头像"
          placeholder="未上传"
          readonly="status"
        ></van-field>
        <van-field
          v-model="formData.nickname"
          name="nickname"
          label="昵称"
          placeholder="未填写"
          readonly="status"
          :rules="[{ required: true, message: '请填写昵称' }]"
        ></van-field>
        <van-field
          v-model="formData.username"
          name="username"
          label="用户名"
          placeholder=""
          readonly
        ></van-field>
        <van-field
          v-model="formData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          readonly="status"
        ></van-field>
        <van-field
          v-model="formData.phone"
          name="phone"
          label="手机号"
          placeholder="未填写"
          :rules="[{ required: true, message: '请填写手机号' }]"
          readonly="status"
        ></van-field>
        <van-field
          v-model="formData.birthday"
          name="birthday"
          label="生日"
          placeholder="未设置"
          readonly="status"
          :rules="[{ required: true, message: '请填写出生日期' }]"
        ></van-field
        ><van-field
          v-model="formData.email"
          name="email"
          label="邮箱"
          placeholder="还未设置"
          :rules="[{ required: true, message: '请填写邮箱' }]"
          readonly="status"
        ></van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary"  @click="editOrSave">
          {{ status ? '修改' : '保存' }}
        </van-button>
      </div>
    </van-form>
    <div class="logut">
      <van-button @click="logout" style="color:rgba(0, 0, 0, 0.633)"  plain block>退出登入</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
let status = ref('false')
const formData = reactive({
  avatar: '',
  nickname: '',
  username: '121321 ',
  password: '',
  birthday: '',
  phone: '',
  email:''
});

const editOrSave = ()=>{
  if(status.value){
    // 修改
  } else {
    // 保存
  }
  status.value = !status.value
}
const logout = ()=>{
  // 登出
  console.log('logout')
}
const edit = ($event) => {
  console.log($event.target)
}


</script>

<style>
</style>