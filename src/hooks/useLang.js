import { ref } from 'vue';
import { useI18n } from "vue-i18n";
export const useLang = () => {
  const list = ref(['English', 'Das ist Deutsch', 'En français', 'italia', 'にっぽん','한국어', 'Португалия', 'español']);
  const i18n = useI18n();
  const setLang = async (lang) => {
    i18n.locale = lang;
    uni.setLocale(lang);
  };

  const setDefault = () => {
    i18n.locale = getLanguage();
    uni.setLocale(getLanguage());
  };

  const onSelectLang = () => {
    uni.showActionSheet({
      title: i18n.t('my.switchLang'),
      itemList: list,
      success: function (res) {
        const { tapIndex } = res;
        if (tapIndex === 0) {
          setLang('en_US');
        } else if (tapIndex === 1) {
          setLang('de_DE');
        } else if (tapIndex === 2) {
          setLang('fr')
        } else if (tapIndex === 3) {
          setLang('it')
        } else if (tapIndex === 4) {
          setLang('ja_JP')
        } else if  (tapIndex === 5) {
          setLang('ko_KR')
        } else if (tapIndex === 6) {
          setLang('pt')
        } else if (tapIndex === 7) {
          setLang('es')
        }
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  }

  const getLanguage = () => {
    return uni.getStorageSync("language") || "en_US"
  }
  
  
  return {
    setLang,
    setDefault,
    onSelectLang,
    getLanguage
  };
};
