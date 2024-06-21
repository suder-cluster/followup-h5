import { ref } from 'vue';
import { useLangStore } from "@/store/modules/lang";
import { useI18n } from "vue-i18n";
export const useLang = () => {
  const langStore = useLangStore();
  const list = ref(['English', 'Das ist Deutsch']);

  const setLang = async (lang) => {
    const i18n = useI18n();
    await langStore.SETLANG(lang);
    i18n.locale = lang;
    uni.setLocale(lang);
    window.location.reload();
  };

  const setDefault = () => {
    console.log('uni.getLocale()=', uni.getLocale())
    const i18n = useI18n();
    i18n.locale = langStore.lang;
    uni.setLocale(langStore.lang);
    if (uni.getLocale() === 'en') {
      window.reload()
    }
    console.log('i18n.locale=', i18n.locale)
    console.log('uni.setLocale=', uni.getLocale())
  };

  const onSelectLang = () => {
    uni.showActionSheet({
      itemList: list,
      success: function (res) {
        const { tapIndex } = res;
        if (tapIndex === 0) {
          setLang('en_US');
        } else if (tapIndex === 1) {
          setLang('de_DE');
        }
        window.location.reload();
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  }

  
  
  return {
    setLang,
    setDefault,
    onSelectLang
  };
};
