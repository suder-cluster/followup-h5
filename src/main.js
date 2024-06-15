import {
	createSSRApp
} from "vue";
import pinia from '@/store';
import uView from './uni_modules/vk-uview-ui';
// 注册全局公共组件
import registComps from "@/plugins/registComps";
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	app.use(pinia);
	app.use(uView);
	app.use(registComps);
	return {
		app,
	};
}
