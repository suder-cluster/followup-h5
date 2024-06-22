<script setup>
import { useLang } from '@/hooks/useLang'
import { useLogin } from '@/hooks/useLogin'
import { onShow, onLaunch } from '@dcloudio/uni-app';

const { getUserInfo } = useLogin();
const { setDefault } = useLang();
onLaunch(() => {
  setDefault();
  getUserInfo();
})

onShow(() => {
})
</script>

<style lang="scss">
@import "@/uni_modules/vk-uview-ui/index.scss";
/*每个页面公共css */
html {
  overflow-y: auto;
}
html,
body {
  width: 100vw;
  height: 100vh;
  // min-height: 100vh;
  background-color: #000;
  color: #fff;
}
</style>
