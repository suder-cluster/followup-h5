<template>
  <div class="custom-container">
    <iframe height="100%" src="https://www.moyu-b1.xyz/chat/index/newChat/m/667abba07a94c?lang=en-us" style="width: 100%;height: 100%;"
            width="100%">
    </iframe>
  </div>
</template>
<script setup>
import {useTitle} from "@/hooks/useTitle";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
useTitle({ title: t("page.custom") });
</script>
<style lang="scss" scoped>
.custom-container {
  overflow: auto;
  width: 100%;
  height: 100vh;
}
</style>