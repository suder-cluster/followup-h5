<template>
  <div class="custom-container">
    <iframe v-if="url" height="100%" src="https://www.moyu-b1.xyz/chat/index/newChat/m/667abba07a94c?lang=en-us" style="width: 100%;height: 100%;"
            width="100%">
    </iframe>
  </div>
</template>
<script setup>
import {useTitle} from "@/hooks/useTitle";
import {useI18n} from "vue-i18n";
import { getConfigKey } from "@/api/modules/config";
import { onShow } from "@dcloudio/uni-app";

const { t } = useI18n();
useTitle({ title: t("page.custom") });

const url = ref('')

const getConfig = async () => {
  const { data } = await getConfigKey("h5.custom.url");
  url.value = data
}
onShow(() => {
  getConfig()
})
</script>
<style lang="scss" scoped>
.custom-container {
  overflow: auto;
  width: 100%;
  height: 100vh;
}
</style>