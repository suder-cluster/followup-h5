<template>
  <div class="my-container">
    <u-form
      :model="formData"
      ref="formRef"
      label-position="top"
      :border-bottom="true"
    >
      <u-form-item :label="$t('identification.front')" prop="idCardFront">
        <div style="display: flex; justify-content: center; width: 100%">
          <u-upload
            :show-file-list="false"
            :file-list="formData.idCardFront"
            ref="uploadRef1"
            :action="actionUrl"
            :multiple="false"
            :max-count="1"
            :header="headers"
            :custom-btn="true"
            width="300rpx"
            height="250rpx"
            :before-upload="beforeUpload"
            @on-error="onError"
            @on-success="
              (data, index, lists) => onSuccess(data, lists, 'front')
            "
            @on-remove="onRemove('front')"
          >
            <template v-slot:addBtn>
              <image
                src="/static/images/front.png"
                mode="aspectFill"
                style="width: 300rpx; height: 220rpx"
              ></image>
            </template>
          </u-upload>
        </div>
      </u-form-item>
      <u-form-item :label="$t('identification.back')" prop="idCardReverse">
        <div style="display: flex; justify-content: center; width: 100%">
          <u-upload
            :show-file-list="false"
            :file-list="formData.idCardReverse"
            ref="uploadRef2"
            :action="actionUrl"
            :multiple="false"
            :max-count="1"
            :header="headers"
            :custom-btn="true"
            width="300rpx"
            height="250rpx"
            :before-upload="beforeUpload"
            @on-error="onError"
            @on-success="
              (data, index, lists) => onSuccess(data, lists, 'reverse')
            "
            @on-remove="onRemove('reverse')"
          >
            <template v-slot:addBtn>
              <image
                src="/static/images/back.png"
                mode="aspectFill"
                style="width: 300rpx; height: 220rpx"
              ></image>
            </template>
          </u-upload>
        </div>
      </u-form-item>
      <u-form-item>
        <u-button
          style="width: 100%"
          type="primary"
          @click="onSubmit"
          :loading="isLoading"
          :disabled="isLoading"
          >{{ $t("common.confirmText") }}</u-button
        >
      </u-form-item>
    </u-form>
  </div>
</template>
<script setup>
import { ref, nextTick } from "vue";
import { onShow, onReady } from "@dcloudio/uni-app";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/store/modules/auth";
import { updateProfileApi } from "@/api/modules/identification";
import { requireR } from "@/regular";
import { getInfoApi } from "@/api/modules/my";

const { t } = useI18n();
useTitle({ title: t("page.identification") });

const Base_Url = import.meta.env.VITE_APP_BASE_API;
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
const authStore = useAuthStore();
const actionUrl = `${Base_Url}/resource/oss/upload`;
const headers = ref({
  Authorization: "Bearer " + authStore.token,
  clientid: clientId,
});

// Ref
const uploadRef1 = ref();
const uploadRef2 = ref();
const formRef = ref();
const formData = ref({
  idCardFront: [],
  idCardReverse: [],
});
const isLoading = ref(false);

const rules = ref({
  idCardFront: [
    {
      validator: (rule, value, callback) => {
        console.log('value=', value)
        if (value?.length > 0) {
          callback();
        } else {
          callback(new Error(t("identification.frontPl")));
        }
      },
    },
  ],
  idCardReverse: [
    {
      validator: (rule, value, callback) => {
        console.log('value=', value)
        if (value?.length > 0) {
          callback();
        } else {
          callback(new Error(t("identification.backPl")));
        }
      },
    },
  ],
});

const init = async () => {
  uni.startPullDownRefresh();
  try {
    const {
      data: { idCardFront, idCardReverse },
    } = await getInfoApi();
    formData.value.idCardFront = idCardFront ? [{ url: idCardFront }] : [];
    formData.value.idCardReverse = idCardReverse
      ? [{ url: idCardReverse }]
      : [];
    console.log("formData.value=", formData.value);
  } catch (err) {
  } finally {
    uni.stopPullDownRefresh();
  }
};
// onsuccess
const onSuccess = (data, lists, type) => {
  console.log("onSuccess=", data);
  if (data.code === 200) {
    if (type === "front") {
      lists.length = 0;
      formData.value.idCardFront = [data.data];
      console.log("formData.value", uploadRef1.value);
    } else if (type === "reverse") {
      lists.length = 0;
      formData.value.idCardReverse = [data.data];
    }
  } else {
    if (type === "front") {
      nextTick(() => {
        formData.value.idCardFront = [];
        uploadRef1.value.clear();
      });
    } else if (type === "reverse") {
      nextTick(() => {
        formData.value.idCardReverse = [];
        uploadRef2.value.clear();
      });
    }
  }
  isLoading.value = false;
  console.log("formData.value", formData.value);
};
// onError
const onError = (value, type) => {
  if (type === "front") {
    nextTick(() => {
      formData.value.idCardFront = [];
      uploadRef1.value.clear();
    });
  } else if (type === "reverse") {
    nextTick(() => {
      formData.value.idCardFront = [];
      uploadRef2.value.clear();
    });
  }
  isLoading.value = false;
};
const beforeUpload = () => {
  isLoading.value = true;
}
// 移除
const onRemove = (type) => {
  if (type === "front") {
    formData.value.idCardFront = [];
  } else if (type === "reverse") {
    formData.value.idCardReverse = [];
  }
};
// 提交
const onSubmit = () => {
  console.log("formRef", formData.value);
  formRef.value?.validate(async (isValid) => {
    if (!isValid) {
      return;
    }
    isLoading.value = true;
    const { idCardFront, idCardReverse } = formData.value;
    try {
      await updateProfileApi({
        ...authStore.userInfo,
        idCardFront: idCardFront?.[0]?.url,
        idCardReverse: idCardReverse?.[0]?.url,
      });
      uni.$u.toast(t("operation.success"));
    } catch (err) {
      console.log(err);
    } finally {
      isLoading.value = false;
    }
  });
};

onShow(() => {
  init();
});

onReady(() => {
  formRef?.value?.setRules(rules.value);
});
</script>
<style lang="scss" scoped>
.my-container {
  padding: 20rpx;
  padding-bottom: 120rpx;
}
</style>
