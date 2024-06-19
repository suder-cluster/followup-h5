<template>
  <div class="registry-container">
    <div class="registry-title">
      <span>{{ $t('registry.title') }}</span>
    </div>
    <u-form class="registry-form" :border-bottom="false">
      <u-form-item prop="email">
        <u-input v-model="formData.email" :placeholder="$t('registry.emailPl')" border></u-input>
      </u-form-item>
      <u-form-item prop="password">
        <u-input
          v-model="formData.password"
          type="password"
          password-icon
          :placeholder="$t('registry.passwordPl')"
          border
        ></u-input>
      </u-form-item>
      <u-form-item prop="inviteCode">
        <u-input
          v-model="formData.inviteCode"
          :placeholder="$t('registry.invitedCodePl')"
          border
        ></u-input>
      </u-form-item>
      <u-form-item>
        <u-button type="primary" style="width: 100%;" @click="onRegistry" :loading="isLoading">{{ $t('registry.registryBtn') }}</u-button>
      </u-form-item>
      <u-form-item>
        <u-button type="info" style="width: 100%;" @click="onBack">{{ $t('registry.backToLogin') }}</u-button>
      </u-form-item>
    </u-form>
  </div>
</template>
<script setup name="Registry">
import { ref } from "vue";
import { registryApi } from '@/api/modules/login'
import { requireR } from '@/regular/index'
import { useProxy } from '@/hooks/useProxy'

const { proxy } = useProxy();
console.log('instance=', instance)
const formData = ref({
  userType: 'h5_user',
  userName: undefined,
  email: undefined,
  code: undefined,
  password: undefined,
  inviteCode: undefined,
});
const rules = ref({
  userNamePl: [
    requireR(proxy.$t('registry.userNamePl'))
  ],
  nickName: [
    requireR(proxy.$t('registry.nickNamePl'))
  ],
  email: [
    requireR(proxy.$t('registry.emailPl'))
  ]
})
const isLoading = ref(false);

const onRegistry = async () => {
  isLoading.value = true;
  try {
    await registryApi(formData.value)
  } catch(err) {
  } finally {
    isLoading.value = false;
  }
};
const onBack = () => {
  uni.navigateBack({
    delta: 1
  });
}
</script>
<style lang="scss" scoped>
.registry-container {
  padding: 40px 20px;
  .registry-title {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 32px;
    color: $u-type-primary;
  }
}
.registry-form {
  padding-top: 40px;
}
</style>
