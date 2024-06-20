<template>
  <div class="registry-container">
    <div class="registry-title">
      <span>{{ $t("registry.title") }}</span>
    </div>
    <u-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      class="registry-form"
      :border-bottom="false"
    >
      <u-form-item prop="username">
        <u-input
          v-model="formData.username"
          :placeholder="$t('registry.userNamePl')"
          border
        ></u-input>
      </u-form-item>
      <u-form-item prop="nickName">
        <u-input
          v-model="formData.nickName"
          :placeholder="$t('registry.nickNamePl')"
          border
        ></u-input>
      </u-form-item>
      <u-form-item prop="email">
        <u-input
          v-model="formData.email"
          :placeholder="$t('registry.emailPl')"
          border
        ></u-input>
      </u-form-item>
      <u-form-item prop="emailCode">
        <u-input
          v-model="formData.emailCode"
          :placeholder="$t('registry.emailCodePl')"
          maxlength="6"
          border
        ></u-input>
        <template #right>
          <u-button
            type="primary"
            :loading="isLoadingCode"
            @click="getVerifyCode"
            >{{ cutDownText }}</u-button
          >
        </template>
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
        <u-button
          type="primary"
          style="width: 100%"
          @click="onRegistry"
          :loading="isLoading"
          >{{ $t("registry.registryBtn") }}</u-button
        >
      </u-form-item>
      <u-form-item>
        <u-button type="info" style="width: 100%" @click="onBack">{{
          $t("registry.backToLogin")
        }}</u-button>
      </u-form-item>
    </u-form>
  </div>
</template>
<script setup name="Registry">
import { ref, computed } from "vue";
import { registryApi, getEmailCodeApi } from "@/api/modules/login";
import { requireR } from "@/regular/index";
import { onReady } from "@dcloudio/uni-app";
import { useI18n } from "vue-i18n";
import { emailR } from '@/regular/index';

const { t } = useI18n();
// Ref
const formRef = ref();
const formData = ref({
  userType: "h5_user",
  username: undefined,
  nickName: undefined,
  email: undefined,
  emailCode: undefined,
  password: undefined,
  inviteCode: undefined,
});
const rules = ref({
  username: [requireR(t("registry.userNamePl"))],
  nickName: [requireR(t("registry.nickNamePl"))],
  email: [
    requireR(t("registry.emailPl")),
    {
      type: "email",
      message: t('registry.emailFormat'),
      trigger: ["blur", "change"],
    },
  ],
  emailCode: [requireR(t("registry.emailCodePl"))],
  password: [requireR(t("registry.passwordPl"))],
});
const isLoading = ref(false);
const countTime = ref(0);

// 是否禁用获取验证码
const isLoadingCode = computed(() => {
  return countTime > 0;
});
const cutDownText = computed(() => {
  if (countTime.value > 0) {
    return countTime.value + "s";
  } else {
    return t("registry.getCode");
  }
});

const getVerifyCode = (() => {
  let timer = null;
  return async () => {
    try {
      const isPass = emailR().pattern.test(formData.value.email)
      console.log('isPass', isPass)
      if (!isPass) {
        return uni.$u.toast(t('registry.emailFormat'));
      }
      await getEmailCodeApi({
        email: formData.value.email,
      });
      countTime.value = 60;
      uni.$u.toast(t('registry.sendCodeSuccess'))
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(() => {
        countTime.value--;
        if (countTime.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    } catch (err) {
    } finally {
    }
  };
})();

const onRegistry = async () => {
  isLoading.value = true;
  console.log("formData.value=", formData.value);
  try {
    await registryApi(formData.value);
    uni.$u.toast(t("operation.success"));
    setTimeout(() => {
      uni.navigateTo({
        url: '/pages/login/index'
      });
    }, 3000)
  } catch (err) {
    console.log("onRegistryerr=", err);
    isLoading.value = false;
  } finally {
    isLoading.value = false;
  }
};
const onBack = () => {
  uni.navigateTo({
    url: '/pages/login/index'
  })
  // uni.navigateBack({
  //   delta: 1,
  // });
};

onReady(() => {
  formRef.value.setRules(rules.value);
});
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
