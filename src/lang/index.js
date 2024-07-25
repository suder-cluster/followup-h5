import {createI18n} from "vue-i18n";
import enUs from "@/locale/en_US.json";
import es from "@/locale/es.json";
import fr from "@/locale/fr.json";
import it from "@/locale/it.json";
import jaJp from "@/locale/ja_JP.json";
import koKr from "@/locale/ko_KR.json";
import pt from "@/locale/pt.json";
import deDE from "@/locale/de_DE.json";

export const messages = {
  en_US: enUs, // 英语
  es: es, // 英语
  fr: fr, // 英语
  it: it, // 英语
  ja_JP: jaJp, // 英语
  ko_KR: koKr, // 英语
  pt: pt, // 英语
  de_DE: deDE, // 德语
};
uni.setStorageSync("language", uni.getStorageSync("language") || "en_US")
let i18Config = {
  locale: uni.getStorageSync("language") || "en_US",
  globalInjection: true,
  legacy: false,
  messages,
};
export const i18n = createI18n(i18Config);
