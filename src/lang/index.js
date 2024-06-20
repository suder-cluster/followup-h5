import { createI18n } from "vue-i18n";
import enUs from "@/locale/en_US.json";
import deDE from "@/locale/de_DE.json";
export const messages = {
  en_US: enUs, // 英语
  de_DE: deDE, // 德语
};
let i18Config = {
  locale: uni.getStorageSync("UNI_LOCALE") || "de_DE",
  globalInjection: true,
  legacy: false,
  messages,
};
export const i18n = createI18n(i18Config);
