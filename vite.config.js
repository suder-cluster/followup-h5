import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "@/uni_modules/vk-uview-ui/index.scss";`
  //     }
  //   }
  // }
})
