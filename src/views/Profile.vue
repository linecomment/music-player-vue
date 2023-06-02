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
        >
          <template #button>
            <van-icon
              @click="edit(1)"
              name="edit"
              size="larger"
            ></van-icon> </template
        ></van-field>
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
          v-model="formData.birthday"
          name="birthday"
          label="生日"
          placeholder="未设置"
          readonly
          :rules="[{ required: true, message: '请填写出生日期' }]"
        >
          <template #button>
            <van-icon
              @click="edit(3)"
              name="edit"
              size="larger"
            ></van-icon> </template
        ></van-field>
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
  <van-popup
    v-model:show="showPop"
    closeable
    close-icon="clear"
    close-icon-position="top-right"
  >
    <div class="p-pop" v-if="activeIndex === 0">
      <!-- 头像 -->
      <van-field name="uploader" label="上传头像">
        <template #input>
          <van-uploader />
        </template>
      </van-field>
    </div>
    <div class="p-pop" v-else-if="activeIndex === 1">
      <!-- 昵称 -->
      <van-field v-model="nickname" placeholder="请输入新用户名" />
    </div>
    <div class="p-pop" v-else-if="activeIndex === 2">
      <!-- 密码 -->
      <van-field v-model="password" placeholder="请输入新密码" />
    </div>
    <div class="p-pop" v-else-if="activeIndex === 3">
      <!-- 生日 -->
      <van-field
        v-model="birthday"
        is-link
        readonly
        name="datePicker"
        label="时间选择"
        placeholder="点击选择日期"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
    </div>
    <div class="p-pop" v-else-if="activeIndex === 4">
      <!-- 手机号 -->
      <van-field v-model="phone" placeholder="请输入新电话" />
    </div>

    <div class="p-pop" v-else-if="activeIndex === 5">
      <!-- 邮箱 -->
      <van-field v-model="email" placeholder="请输入新邮箱" />
    </div>
  </van-popup>
</template>

<script setup>
import FormPop from "@/components/FormPop.vue";
import { ref, reactive } from "vue";
const showPop = ref(false);
const activeIndex = ref(0);
const showPicker = ref(false);

const formData = reactive({
  avatar: "",
  nickname: "linecomment",
  userId: "121321 ",
  password: "1323456",
  birthday: "2003-09-21",
  phone: "17709891231",
  email: "3212012901@qq.com",
});

const avatar = ref("");
const nickname = ref("");
const password = ref("");
const birthday = ref("");
const phone = ref("");
const email = ref("");
const onConfirm = ({ selectedValues }) => {
  result.value = selectedValues.join("/");
  showPicker.value = false;
};

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
.line-profile {
  height: 100%;
  width: 100%;

  .van-popup {
    width: 100%;
    height: 50%;
  }

  .p-pop {
    height: 100%;
  }
}
</style>