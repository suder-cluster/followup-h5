import { ref } from "vue";

export const useModal = (opts) => {
  const visible = ref(false);
  const title = ref("");
  const formData = ref({});
  const isLoading = ref(false);

  const onOpen = async (text, cb) => {
    title.value = text;
    visible.value = true;
    const { initFormData } = opts;
    if (initFormData) {
      formData.value = { ...initFormData };
    }
    cb && (await cb());
    visible.value = true;
  };

  // 关闭弹窗
  const onClose = () => {
    const { formRef } = opts;
    // 重置表单
    if (formRef) {
      formRef.value.resetFields();
    }
    visible.value = false;
  };

  // 点击确认按钮
  const onConfirm = async () => {
    const { formRef, submitCb, modalRef } = opts;
    console.log("aaa=", formRef);
    isLoading.value = true;
    if (formRef) {
      formRef.value.validate(async (isValid) => {
        console.log("isValid=", isValid);
        if (!isValid) {
          isLoading.value = false;
          return;
        }
        if (opts) {
          try {
            await submitCb();
            onClose();
          } catch (err) {
            console.log("err=", err);
          } finally {
            isLoading.value = false;
          }
        }
      });
    } else {
      if (opts) {
        try {
          const data = await submitCb();
          if (data !== false) {
            onClose();
          }
          console.log('modalRef', modalRef)
        } catch (err) {
          console.log("err=", err);
        } finally {
          isLoading.value = false;
          modalRef?.value?.clearLoading();
        }
      }
    }
  };
  return {
    isLoading,
    title,
    visible,
    formData,
    onOpen,
    onClose,
    onConfirm,
  };
};
