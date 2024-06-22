import { ref } from 'vue';
import { useAuthStore } from "@/store/modules/auth"
import { loginApi, logOutApi } from '@/api/modules/login'
import { getInfoApi } from '@/api/modules/my'
import { useI18n} from 'vue-i18n';
export const useLogin = () => {
  const { t } = useI18n();
  const authStore = useAuthStore();
  const isLoading = ref(false)

  const onLogin = async (params) => {
    isLoading.value = true
    try {
      const { data } = await loginApi(params)
      await authStore.SETLOGIN(data)
      await getUserInfo();
      uni.$u.toast(t(`login.loginSuccess`))
      uni.navigateTo({ 
        url: '/pages/home/index'
      });
    } catch(err) {

    } finally {
      isLoading.value = false;
    }
    
  }
  const getUserInfo = async () => {
    if (!authStore.token) {
      return
    }
    const { data: user } = await getInfoApi();
    await authStore.SETUSERINFO(user)
  }
  const onLogOut = async () => {
    await logOutApi();
    await authStore.LOGOUT();
  }

  return {
    authStore,
    isLoading,
    onLogin,
    onLogOut,
    getUserInfo,
    t
  }
}