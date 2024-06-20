<script>
import { useLang } from '@/hooks/useLang'
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    const { setDefault } = useLang();
    setDefault();
  },
  onHide: function () {
    console.log('App Hide')
  },
  // onReady: function() {
  //   console.log('出发了')
  //   const { setDefault } = useLang();
  //   setDefault();
  //   // location.reload();
  // }
}
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
  min-height: 100vh;
  background-color: #000;
  color: #fff;
}
</style>
