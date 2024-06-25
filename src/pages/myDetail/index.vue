<template>
  <div class="my-detail">
    <u-cell-group>
      <u-cell-item
        :title="$t('myDetail.avatar')"
        :title-style="{ color: '#000' }"
        :value-style="{ color: '#000' }"
        bg-color="#fdf6ec"
        :border-top="false"
        hover-class="hover-cell-item"
        :arrow="false"
      >
        <template v-slot:right-icon>
          <u-upload
            ref="uploadRef"
            :action="actionUrl"
            :multiple="false"
            :max-count="1"
            :header="headers"
            @on-error="onError"
            @on-success="onSuccess"
            upload-text=""
            :show-tips="false"
            :show-upload-list="false"
          >
            <template v-slot:addBtn>
              <u-avatar :src="avatarUrl" />
            </template>
          </u-upload>
          
        </template>
      </u-cell-item>
      <u-cell-item
        :title="$t('myDetail.nickName')"
        :value="detailInfo.nickName"
        :title-style="{ color: '#000' }"
        :value-style="{ color: '#000' }"
        bg-color="#fdf6ec"
        :border-top="false"
        hover-class="hover-cell-item"
        :arrow="false"
      ></u-cell-item>
      <u-cell-item
        :title="$t('myDetail.email')"
        :value="detailInfo.email"
        :title-style="{ color: '#000' }"
        :value-style="{ color: '#000' }"
        bg-color="#fdf6ec"
        :border-top="false"
        hover-class="hover-cell-item"
        :arrow="false"
      ></u-cell-item>
      <!-- :value="$t('myDetail.modify')" -->
      <u-cell-item
        :title="$t('myDetail.modifyPass')"
        :title-style="{ color: '#000' }"
        :value-style="{ color: '#000' }"
        bg-color="#fdf6ec"
        :border-top="false"
        hover-class="hover-cell-item"
        :index="3"
        @click="onCellClick"
        :arrow="false"
      ></u-cell-item>
    </u-cell-group>
    <u-modal
      ref="modalRef"
      v-model="visible"
      :title="title"
      :async-close="true"
      :show-cancel-button="true"
      @confirm="onConfirm"
      @cancel="onClose"
      :cancel-text="$t('common.cancelText')"
      :confirm-text="$t('common.confirmText')"
    >
      <u-form ref="formRef" :model="formData">
        <div class="form-content">
          <u-form-item prop="oldPassword" :border-bottom="false">
            <u-input
              type="password"
              v-model="formData.oldPassword"
              :placeholder="$t('myDetail.oldPassPl')"
              border
            />
          </u-form-item>
          <u-form-item prop="newPassword" :border-bottom="false">
            <u-input
              type="password"
              v-model="formData.newPassword"
              :placeholder="$t('myDetail.newPassPl')"
              border
            />
          </u-form-item>
          <u-form-item prop="password" :border-bottom="false">
            <u-input
              type="password"
              v-model="formData.password"
              :placeholder="$t('myDetail.newPassPl2')"
              border
            />
          </u-form-item>
        </div>
      </u-form>
    </u-modal>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { onShow, onReady, onPullDownRefresh } from "@dcloudio/uni-app";
import { getInfoApi } from "@/api/modules/my";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { useModal } from "@/hooks/useModal";
import { modifyPassApi } from "@/api/modules/login";
import { requireR } from "@/regular";
import { useAuthStore } from '@/store/modules/auth';
import { useLogin } from '@/hooks/useLogin'

const { t } = useI18n();
useTitle({ title: t("page.myDetail") });

const authStore = useAuthStore()
const { getUserInfo } = useLogin();

const Base_Url = import.meta.env.VITE_APP_BASE_API;
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
const actionUrl = `${Base_Url}/system/user/profile/avatar`;
const headers = ref({
  Authorization: "Bearer " + authStore.token,
  clientid: clientId,
});



// Ref
const uploadRef = ref();
const modalRef = ref();
const formRef = ref();
console.log("formRef=", formRef);

const detailInfo = ref({});

const onCellClick = (index) => {
  console.log("index===", index);
  if (index === 3) {
    onOpen(t("login.modifyPass"));
  }
};

const avatarUrl = computed(() => {
  return authStore?.userInfo?.avatar
})

const onSubmit = async () => {
  const { oldPassword, newPassword, password } = formData.value;
  if (!oldPassword || !newPassword || !password) {
    uni.$u.toast(t('myDetail.resetPassValid'))
    return false
  } else if (newPassword !== password) {
    uni.$u.toast(t('myDetail.passwordValid'))
    return false
  }
  await modifyPassApi({
    oldPassword,
    newPassword,
  });
  uni.$u.toast(t('operation.success'))
};


// onsuccess
const onSuccess = (data, index, lists, name) => {
  console.log("arges=", data, index, lists, name);
  if (data.code !== 200) {
    uploadRef.value.clear();
  } else {
    getUserInfo();
  }
};
// onError
const onError = (value) => {
  console.log("value=", value);
  uploadRef.value.clear();
};

const { visible, title, formData, onOpen, onClose, onConfirm } =
  useModal({
    modalRef: modalRef,
    initFormData: {
      oldPassword: undefined,
      newPassword: undefined,
      password: undefined,
    },
    submitCb: onSubmit,
  });
const rules = ref({
  oldPassword: [requireR(t("myDetail.oldPassPl"))],
  newPassword: [requireR(t("myDetail.newPassPl"))],
  newPassword: [requireR(t("myDetail.newPassPl2"))],
});
const init = async () => {
  try {
    uni.startPullDownRefresh();
    const { data } = await getInfoApi();
    detailInfo.value = data;
  } catch (err) {
  } finally {
    uni.stopPullDownRefresh();
  }
};
onPullDownRefresh(() => {
  init();
})
onShow(() => {
  init();
});
onReady(() => {
  formRef?.value?.setRules(rules.value);
  console.log('modalRef')
});
</script>
<style lang="scss" scoped>
.my-detail {
  padding: 20rpx;
  padding-bottom: 120rpx;
  .form-content {
    padding: 20rpx;
  }
}
.hover-cell-item {
  // background-color:  !important;
}
::v-deep .u-model {
  background-color: #333 !important;
}
::v-deep .u-list-item {
  display: none;
}
</style>
