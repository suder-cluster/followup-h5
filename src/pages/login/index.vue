<template>
  <div class="login-container">
    <div class="login-title">
      <span></span>
      <span>{{ $t('login.title') }}</span>
    </div>
    <u-form ref="formRef" :model="formData" :rules="rules" class="login-form" :border-bottom="false">
      <u-form-item prop="username">
        <u-input
          v-model="formData.username"
          :placeholder="$t('login.userNamePl')"
          border
        />
      </u-form-item>
      <u-form-item prop="password">
        <u-input
          type="password"
          v-model="formData.password"
          :placeholder="$t('login.passwordPl')"
          border
          password-icon
        />
      </u-form-item>
      <u-form-item>
        <u-button type="primary" style="width: 100%;" @click="onLogin" :loading="isLoading">{{ $t('login.loginBtn') }}</u-button>
      </u-form-item>
      <u-form-item>
        <span class="registry-text" @click="onRegistry">{{ $t('login.bottomText') }}</span>
      </u-form-item>
    </u-form>
    <div class="switch-lang-container">
      <span class="switch-lang-text" @click="onSelectLang">{{$t('my.switchLang')}}</span>
    </div>
    
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useLogin } from '@/hooks/useLogin';
import { requireR } from "@/regular/index";
import { onReady } from "@dcloudio/uni-app";
import { useTitle } from '@/hooks/useTitle';
import { useAuthStore } from '@/store/modules/auth'
import { useLang } from "@/hooks/useLang";

const { onSelectLang } = useLang();
const authStore = useAuthStore();
// 如果有token，去首页
if (authStore.token) {
  uni.navigateTo({
    url: '/pages/home/index'
  })
}
const { isLoading, onLogin: onLogin2, t } = useLogin(); 
useTitle({ title: t('page.login') })

// Ref
const formRef = ref();

const formData = ref({
  tenantId: '000000',
  username: "",
  password: ""
});
const rules = ref({
  username: [requireR(t("login.userNamePl"))],
  password: [requireR(t("login.passwordPl"))],
});
const onRegistry = (e) => {
  console.log('e==', e);
  uni.navigateTo({
    url: '/pages/registry/index'
  })
}
const onLogin = async () => {
  try { 
    await onLogin2(formData.value);
  } catch(err) {
  } finally {
    isLoading.value = false
  }
}
onReady(() => {
  formRef.value.setRules(rules.value);
});
</script>
<style lang="scss" scoped>
.login-container {
  box-sizing: border-box;
  padding: 80rpx 40rpx;
  .login-title {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 80rpx;
    color: $u-type-primary;
  }
  .login-form {
    padding-top: 80rpx;
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
.switch-lang-container {
  display: flex;
  justify-content: center;
  .switch-lang-text {
    display: flex;
    justify-content: center;
    width: 100%;
    color: $u-type-primary;
  }
  .switch-lang-text:active {
    color: red;
  }
}
</style>
