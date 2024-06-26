<script setup>
import { useLang } from '@/hooks/useLang'
import { useLogin } from '@/hooks/useLogin'
import { onShow, onLaunch } from '@dcloudio/uni-app';

const { getUserInfo } = useLogin();
const { setDefault } = useLang();
onLaunch(() => {
  
})

onShow(async () => {
  uni.onLocaleChange(({ locale }) => {
    console.log('localeChange=', locale)
    if (locale === uni.getStorageSync("language")) {
      return
    }
    uni.setStorageSync("language", locale);
    window.location.reload();
  })
  setDefault();
  getUserInfo();
})
</script>

<style lang="scss">
@import "@/uni_modules/vk-uview-ui/index.scss";
@import "@/styles/public.scss";
/*每个页面公共css */
html,
body {
  width: 100vw;
  height: 100vh;
  // min-height: 100vh;
  background-color: #000;
  color: #fff;
}
</style>
