<template>
  <div class="line-profile">
    <van-form>
      <van-cell-group inset>
        <van-field
          v-model="formData.avatar"
          name="avatar"
          label="头像"
          placeholder="未上传"
          readonly
          ref="fieldname"
        >
          <template #button>
            <van-icon
              @click="edit(0)"
              name="add-o"
              size="larger"
            ></van-icon> </template
        ></van-field>
        <van-field
          v-model="formData.nickname"
          name="nickname"
          label="昵称"
          placeholder="未填写"
          readonly
          :rules="[{ required: true, message: '请填写昵称' }]"
          ref="fieldname"
        >
          <template #button>
            <van-icon
              @click="edit(1)"
              name="edit"
              size="larger"
            ></van-icon> </template
        ></van-field>
        <van-field
          v-model="formData.userId"
          name="userId"
          label="用户 ID"
          placeholder=""
          readonly
        >
        </van-field>
        <van-field
          v-model="formData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          readonly
        >
          <template #button>
            <van-icon @click="edit(2)" name="edit" size="larger"></van-icon>
          </template>
        </van-field>
        <van-field
          v-model="formData.phone"
          name="phone"
          label="手机号"
          placeholder="未填写"
          :rules="[{ required: true, message: '请填写手机号' }]"
          readonly
        >
          <template #button>
            <van-icon
              @click="edit(3)"
              name="edit"
              size="larger"
            ></van-icon> </template
        ></van-field>
        <van-field
          v-model="formData.birthday"
          name="birthday"
          label="生日"
          placeholder="未设置"
          readonly
          :rules="[{ required: true, message: '请填写出生日期' }]"
        >
          <template #button>
            <van-icon
              @click="edit(4)"
              name="edit"
              size="larger"
            ></van-icon> </template
        ></van-field>
        <van-field
          v-model="formData.email"
          name="email"
          label="邮箱"
          placeholder="还未设置"
          :rules="[{ required: true, message: '请填写邮箱' }]"
          readonly
        >
          <template #button>
            <van-icon
              @click="edit(5)"
              name="edit"
              size="larger"
            ></van-icon> </template
        ></van-field>
      </van-cell-group>
    </van-form>
    <div class="logut">
      <van-button
        @click="logout"
        style="color: rgba(0, 0, 0, 0.633)"
        plain
        block
        >退出登入</van-button
      >
    </div>
  </div>
  <van-popup v-model:show="showPop" closeable
  close-icon="clear" close-icon-position="top-right">
    <div v-if="activeIndex === 0">
      <form-pop :formData="formData" :activeIndex="activeIndex"></form-pop>
    </div>
    <div v-else-if="activeIndex === 1">
      <van-field
        name="nickname"
        label="原昵称"
        :placeholder="formData.nickname"
        readonly
      ></van-field>
      <van-field
        v-model="updateForm.nickname"
        name="nickname"
        label="新昵称"
        placeholder="未填写"
        :rules="[{ required: true, message: '请填写昵称' }]"
      ></van-field>
    </div>
    <div v-else-if="activeIndex === 2">
      <form-pop :formData="formData" :activeIndex="activeIndex"></form-pop>
    </div>
    <div v-else-if="activeIndex === 3">
      <form-pop :formData="formData" :activeIndex="activeIndex"></form-pop>
    </div>
    <div v-else-if="activeIndex === 4">
      <form-pop :formData="formData" :activeIndex="activeIndex"></form-pop>
    </div>
    <div v-else-if="activeIndex === 5">
      <form-pop :formData="formData" :activeIndex="activeIndex"></form-pop>
    </div>
  </van-popup>
</template>

<script setup>
import FormPop from "@/components/FormPop.vue";
import { ref, reactive } from "vue";
const showPop = ref(false);
const fieldname = ref(null);
const activeIndex = ref(0);

const formData = reactive({
  avatar: "",
  nickname: "linecomment",
  userId: "121321 ",
  password: "1323456",
  birthday: "2003-09-21",
  phone: "17709891231",
  email: "3212012901@qq.com",
});

const updateForm = reactive({
  avatar: "",
  nickname: "",
  password: "",
  birthday: "",
  phone: "",
  email: "",
});

const logout = () => {
  // 登出
  console.log("logout");
};
const edit = (i) => {
  showPop.value = true;
  activeIndex.value = i;
};
</script>

<style lang="less" scoped>
</style>