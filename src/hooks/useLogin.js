import { ref } from 'vue';
import { useAuthStore } from "@/store/modules/auth"
import { loginApi } from '@/api/modules/login'
import { useI18n} from 'vue-i18n';
export const useLogin = () => {
  const { t } = useI18n();
  const authStore = useAuthStore();
  const isLoading = ref(false)

  const onLogin = async (params) => {
    isLoading.value = true
    const { data } = await loginApi(params)
    await authStore.SETLOGIN(data)
    uni.$u.toast(t(`login.loginSuccess`))
    uni.navigateTo({ 
      url: '/pages/home/index'
    });
  }

  return {
    authStore,
    isLoading,
    onLogin,
    t
  }
}