import { createI18n } from 'vue-i18n';
import en from './en/index'
import ge from './ge/index'
export const messages = {
  en,
  ge
}
let i18Config = {
	locale: uni.getLocale(),
  globalInjection: true,
  legacy: false,
	messages
}
export const i18n = createI18n(i18Config);