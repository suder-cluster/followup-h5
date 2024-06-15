import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 创建pinia实例
const pinia = createPinia()
// 持久化
pinia.use(persist);

// 导出pinia，main.js使用
export default pinia
