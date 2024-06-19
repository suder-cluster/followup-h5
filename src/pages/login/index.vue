<template>
  <div class="login-container">
    <div class="login-title">
      <span></span>
      <span>{{ $t('login.title') }}</span>
    </div>
    <u-form class="login-form" :border-bottom="false">
      <u-form-item>
        <u-input
          v-model="formData.username"
          :placeholder="$t('login.userNamePl')"
          border
        />
      </u-form-item>
      <u-form-item>
        <u-input
          type="password"
          v-model="formData.password"
          :placeholder="$t('login.passwordPl')"
          border
          password-icon
        />
      </u-form-item>
      <u-form-item>
        <u-button type="primary" style="width: 100%;" @click="onLogin">{{ $t('login.loginBtn') }}</u-button>
      </u-form-item>
      <u-form-item>
        <span class="registry-text" @click="onRegistry">{{ $t('login.bottomText') }}</span>
      </u-form-item>
    </u-form>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref } from "vue";
import { loginApi } from '@/api/modules/login'

let instance = getCurrentInstance();
console.log("instance=", instance);
console.log("instance=", uni.getLocale());

const formData = ref({
  tenantId: '000000',
  username: "",
  password: ""
});

const onRegistry = (e) => {
  console.log('e==', e);
  uni.navigateTo({
    url: '/pages/registry/index'
  })
}
const onLogin = async () => {
  const data = await loginApi(formData.value);
}
</script>
<style lang="scss" scoped>
.login-container {
  box-sizing: border-box;
  padding: 40px 20px;
  .login-title {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 40px;
    color: $u-type-primary;
  }
  .login-form {
    padding-top: 40px;
  }
  .registry-text {
    display: flex;
    justify-content: center;
    width: 100%;
    color: #999;
  }
  .registry-text:active {
    color: $u-type-primary;
  }
}
</style>
