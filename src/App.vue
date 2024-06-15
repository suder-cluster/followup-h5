<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
@import "@/uni_modules/vk-uview-ui/index.scss";
/*每个页面公共css */
html,
body {
  width: 100vw;
  min-height: 100vh;
  background-color: #000;
  color: #fff;
}
</style>
