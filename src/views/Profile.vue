<template>
  <div class="line-profile">
    <div class="avatar">
      <van-image width="2.5rem" height="2.5rem" :src=avatarUrl></van-image>
      <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        :max-size="500 * 1024"
      >
        <van-button class="upload-btn" icon="plus"></van-button>
      </van-uploader>
    </div>
    <van-divider></van-divider>
    <van-form>
      <van-cell-group inset>
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
            <van-icon @click="edit" name="edit" size="larger"></van-icon>
          </template>
        </van-field>

        <van-field
          v-model="formData.gender"
          name="birthday"
          label="性别"
          placeholder="未设置"
          readonly
        >
          <template #button>
            <van-icon
              @click="edit"
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
              @click="edit"
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
              @click="edit"
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
              @click="edit"
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
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="submitData.nickname"
          name="nickname"
          label="用户名"
          :placeholder="formData.nickname"
        />
        <van-field
          v-model="submitData.password"
          name="password"
          label="密码"
          placeholder="请设置新密码"
        />
        <van-field
          v-model="submitData.gender"
          name="gender"
          label="性别"
          :placeholder="formData.gender"
        ></van-field>

        <van-field
          v-model="submitData.birthday"
          is-link
          readonly
          name="birthday"
          label="生日"
          :placeholder="formData.birthday"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
        <van-field
          v-model="submitData.phone"
          name="phone"
          label="手机号"
          :placeholder="formData.phone"
        />
        <van-field
          v-model="submitData.email"
          name="email"
          label="邮箱"
          :placeholder="formData.email"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          修改
        </van-button>
      </div>
    </van-form>
  </van-popup>
  <!-- <van-popup v-model:show="showGenderPicker" position="bottom">
    <van-picker
      :columns="genderOptions"
      v-model="submitData.gender"
      @confirm="showGenderPicker = false"
      @cancel="showGenderPicker = false"
    />
  </van-popup> -->
  <!-- <van-popup v-model="showGenderPicker" position="bottom">
    <van-picker
      v-model="submitData.gender"
      title="标题"
      :columns="columns"
      @confirm="confirmGender"
      @cancel="showGenderPicker = false"
    />
  </van-popup> -->
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { upload, getUserInfo,updateUserInfo } from "@/api/user";
const showPop = ref(false);
const showPicker = ref(false);
const showGenderPicker = ref(false);
const store = useStore();
const userInfo = computed(() => {
  return store.state.userInfo;
});
let user = {}
onMounted(() => {
  // 获取用户信息
  getUserInfo(userInfo.value.userId)
    .then((res) => {
      store.commit("SET_USER_INFO", res.data);
    })
    .catch((error) => {
      console.log(error);
    });

});
const avatarUrl = computed(()=>{
  return store.state.userInfo.avatarUrl
})
const formData = reactive({
  nickname: userInfo.value.nickname,
  password: userInfo.value.password,
  gender: userInfo.value.gender,
  birthday: userInfo.value.birthday,
  phone: userInfo.value.phone,
  email: userInfo.value.email,
});
const submitData = reactive({
  userId:userInfo.value.userId,
  nickname: "",
  password: "",
  gender: "",
  birthday:"" ,
  phone: "",
  email: "",
});


const onConfirm = ({ selectedValues }) => {
  submitData.birthday = selectedValues.join("-");
  showPicker.value = false;
  console.log(submitData);
  
};

const onSubmit = (values) => {
  updateUserInfo(submitData).then(res=>{
    console.log(res)
    showPop.value = false
  }).catch(error=>{
    console.log(error,'更新失败')
  })
  console.log("submit", values);
};

const logout = () => {
  // 登出
  console.log("logout");
};
const edit = () => {
  showPop.value = true;
};
const fileList = ref([]);

const afterRead = (file) => {
  file.status = "uploading";
  file.message = "上传中...";
  upload(file, 1662998854292762624n)
    .then((res) => {
      file.status = "finished";
      file.message = "上传成功";
    })
    .catch((error) => {
      file.status = "failed";
      file.message = "上传失败";
    });
};
</script>

<style lang="less" scoped>
.line-profile {
  height: 100%;
  width: 100%;
  .avatar{
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 2rem;
    padding-right: 1rem;
    .upload-btn{
      width: 3rem;
      height: 2rem;
      font-size: smaller;
      background-color: rgb(245, 114, 114);
      color: #fff;
    }
  }
 
}
</style>