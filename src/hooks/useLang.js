import { ref } from 'vue';
import { useLangStore } from "@/store/modules/lang";
import { useI18n } from "vue-i18n";
export const useLang = () => {
  const langStore = useLangStore();

  const visible = ref(false)

  const setLang = (lang) => {
    const i18n = useI18n();
    langStore.SETLANG(lang);
    uni.setLocale(lang);
    i18n.locale = lang;
  };
  const setDefault = () => {
    const i18n = useI18n();
    i18n.locale = langStore.lang;
    uni.setLocale(langStore.lang);
  };
  return {
    visible,
    setLang,
    setDefault,
  };
};
