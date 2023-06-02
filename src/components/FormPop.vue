<template>
  <div class="line-pop">
    <div class="form">
      <van-field
        label-align="center"
        label-width="10px"
        :placeholder="param"
        readonly
      />
      <van-field v-model="updateValue"  placeholder="请填写" />
    </div>
    <div class="button">
      <van-button block type="primary" @click="save"> 修改 </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, reactive, onMounted, computed } from "vue";
// const formData = reactive({
//     formData
// })
const dataValue = ref(null);
const updateValue = ref(null);
const props = defineProps({
  formData: Object,
  activeIndex: String,
});
const icon = ref(null);
onMounted(() => {
  const i = props.activeIndex;
  if (i === 0) {
    // 头像
    dataValue.value = "avatar";
  } else if (i === 1) {
    // 昵称
    dataValue.value = "nickname";
  } else if (i === 2) {
    // 密码
    dataValue.value = "password";
  } else if (i === 3) {
    // 手机号
    dataValue.value = "phone";
  } else if (i === 4) {
    // 生日
    dataValue.value = "birthday";
  } else {
    // 邮箱
    dataValue.value = "email";
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

const param = computed(() => {
  return eval(`props.formData.${dataValue.value}`);
});
</script>

<style lang="less" scoped>
.line-pop {
  height: 100%;
  width: 100%;
  .form {
    margin-top: 1rem;
  }
  .button {
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    align-items: center;
  }
}
.van-field-input-text-color {
}
</style>