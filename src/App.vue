<script>
import { useLang } from '@/hooks/useLang'
import { useAuthStore } from '@/store/modules/auth'
export default {
  data() {
    return {
      authStore: useAuthStore()
    }
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    const { setDefault } = useLang();
    setDefault();
    this.authStore.getUserInfo();
    console.log('authStore=', this.authStore)
  },
  onHide: function () {
    console.log('App Hide')
  },
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
  height: 100vh;
  // min-height: 100vh;
  background-color: #000;
  color: #fff;
}
</style>
