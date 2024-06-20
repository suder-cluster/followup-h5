<template>
  <div class="hall-container">
    <scrollList :list="list">
      <template #default="{ rows }">
        <view class="rows">
          <view class="">{{ rows.name }}</view>
          <view class="">{{ rows.time }}</view>
        </view>
      </template>
    </scrollList>
  </div>
</template>
<script setup name="Hall">
import { ref } from "vue";
import scrollList from "@/components/zh-scrollList/scrollList/scrollList";

const list = ref([
  {
    id: 1,
    name: "用户1",
    time: "54分钟前",
  },
  {
    id: 2,
    name: "用户2",
    time: "54分钟前",
  },
  {
    id: 3,
    name: "用户3",
    time: "54分钟前",
  },
  {
    id: 4,
    name: "用户4",
    time: "54分钟前",
  },
  {
    id: 5,
    name: "用户5",
    time: "54分钟前",
  },
  {
    id: 6,
    name: "用户6",
    time: "54分钟前",
  },
  {
    id: 7,
    name: "用户7",
    time: "54分钟前",
  },
  {
    id: 8,
    name: "用户8",
    time: "54分钟前",
  },
  {
    id: 9,
    name: "用户9",
    time: "54分钟前",
  },
  {
    id: 10,
    name: "用户10",
    time: "54分钟前",
  },
]);
</script>
<style lang="scss" scoped>
.hall-container {
  padding: 40px 20px;
}
</style>
