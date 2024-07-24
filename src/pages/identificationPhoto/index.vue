<template>
  <div class="my-container">
    <u-form
      :model="form"
      ref="form1"
      label-position="top"
      :border-bottom="false"
    >
      <u-form-item :label="$t('identification.front')">
        <div style="display: flex; justify-content: center; width: 100%">
          <u-upload
            :auto-upload="false"
            ref="uUploadRef1"
            name="files"
            :action="actionUrl"
            :multiple="false"
            :max-count="1"
            :header="headers"
            :custom-btn="true"
            width="300rpx"
            height="250rpx"
            @on-choose-complete="(lists) => onChooseImg(lists, 'front')"
            @on-remove="onRemove('front')"
          >
            <template v-slot:addBtn>
              <u-image
                src="/static/images/front.png"
                mode="aspectFill"
                style="width: 300rpx; height: 220rpx"
              ></u-image>
            </template>
          </u-upload>
        </div>
      </u-form-item>
      <u-form-item :label="$t('identification.back')">
        <div style="display: flex; justify-content: center; width: 100%">
          <u-upload
            name="files"
            :auto-upload="false"
            ref="uUploadRef2"
            :action="actionUrl"
            :multiple="false"
            :max-count="1"
            :header="headers"
            :custom-btn="true"
            width="300rpx"
            height="250rpx"
            @on-choose-complete="(lists) => onChooseImg(lists, 'reverse')"
            @on-remove="onRemove('back')"
          >
            <template v-slot:addBtn>
              <u-image
                src="/static/images/back.png"
                mode="aspectFill"
                style="width: 300rpx; height: 220rpx"
              ></u-image>
            </template>
          </u-upload>
        </div>
      </u-form-item>
      <u-form-item>
        <u-button type="primary" @click="onUpload">上传</u-button>
      </u-form-item>
    </u-form>
  </div>
</template>
<script setup>
import { ref, nextTick, computed } from "vue";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/store/modules/auth";
import http from "@/api/http";

const { t } = useI18n();
useTitle({ title: t("page.identification") });

const Base_Url = import.meta.env.VITE_APP_BASE_API;
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
const authStore = useAuthStore();
const actionUrl = `${Base_Url}/system/user/profile/idCard`;
const headers = ref({
  Authorization: "Bearer " + authStore.token,
  clientid: clientId,
});

// Ref
const uploadRef1 = ref();
const uploadRef2 = ref();
const formData = ref({
  front: "",
  reverse: "",
});

const onRemove = (type) => {
  console.log("onRemove=", type);
  if (type === "front") {
    formData.value.front = "";
  } else if (type === "reverse") {
    formData.value.reverse = "";
  }
};
const onChooseImg = (lists, type) => {
  lists[0].file.name = type;
  formData.value[type] = lists[0].file;
};
const onUpload = async () => {
  await nextTick();
  console.log('formData=', formData.value)
  const form = new FormData();
  form.append("files", formData.value.front);
  form.append("files", formData.value.reverse);
  http.uploadFile(actionUrl, {
    header: headers.value,
    name: "files",
    formData: form,
  });
};
</script>
<style lang="scss" scoped>
.my-container {
  padding: 20rpx;
  padding-bottom: 120rpx;
}
</style>
