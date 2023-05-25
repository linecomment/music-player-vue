<template>
  <div class="line-pop">
    <div class="form">
      <van-field
        :name="dataLabel.label1"
        :label="dataLabel.label1"
        :placeholder="dataLabel.label1"
        readonly
      />
      <van-field
        v-model="updateValue"
        :name="dataLabel.label2"
        :label="dataLabel.label2"
        placeholder="请填写"
      />
    </div>

    <div class="button">
      <van-button plain type="success" @click="cancle">取消</van-button>
      <van-button plain type="warning" @click="save"> 修改 </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, reactive, onMounted } from "vue";
// const formData = reactive({
//     formData
// })
const dataLabel = reactive({
  label1: null,
  label2: null,
});
const updateValue = ref(null);
const props = defineProps({
  formData: Object,
  activeIndex: String,
});
onMounted(() => {
  const i = props.activeIndex;
  if (i === 0) {
    // 头像
    dataLabel.label1 = "原头像";
    dataLabel.label2 = "新头像";
  } else if (i === 1) {
    // 昵称
    dataLabel.label1 = "原昵称";
    dataLabel.label2 = "新昵称";
  } else if (i === 2) {
    // 密码
    dataLabel.label1 = "原密码";
    dataLabel.label2 = "新密码";
  } else if (i === 3) {
    // 手机号
    dataLabel.label1 = "原手机号";
    dataLabel.label2 = "新手机号";
  } else if (i === 4) {
    // 生日
    dataLabel.label1 = "原生日";
    dataLabel.label2 = "新生日";
  } else {
    // 邮箱
    dataLabel.label1 = "原邮箱";
    dataLabel.label2 = "新邮箱";
  }
});

const save = () => {
  const i = props.activeIndex;
  if (i === 0) {
    // 头像
  } else if (i === 1) {
    // 昵称
  } else if (i === 2) {
    // 密码
  } else if (i === 3) {
    // 手机号
  } else if (i === 4) {
    // 生日
  } else {
    // 邮箱
  }
  // 发送post请求
};
</script>

<style lang="less" scoped>
.line-pop {
  height: 100%;
  .form {
    margin-top: 1rem;
    color: red !important;
  }
  .button {
    margin-top: 1rem;
    margin-bottom: 1rem;
    justify-content: space-around;
    display: flex;
  }
}
</style>