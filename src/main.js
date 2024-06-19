import {
	createSSRApp
} from "vue";
import pinia from '@/store';
import uView from './uni_modules/vk-uview-ui';
// 注册全局公共组件
import registComps from "@/plugins/registComps";
import App from "./App.vue";
import { createI18n } from 'vue-i18n';
// 这个是语言包，放置各种语言的json文件
import messages from './locale/index';

let i18Config = {
	locale: uni.getLocale(),
	messages
}
const i18n = createI18n(i18Config);

export function createApp() {
	const app = createSSRApp(App);
	app.use(i18n);
	app.use(pinia);
	app.use(uView);
	app.use(registComps);
	
	return {
		app,
	};
}
