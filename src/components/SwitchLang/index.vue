<template>
  <u-action-sheet :list="list" v-model="show" @click="onChangeLang" z-index="999999" :safe-area-inset-bottom="true"></u-action-sheet>
</template>
<script setup name="SwitchLang">
import { computed, ref, withDefaults, defineProps, defineEmits } from 'vue';
import { useLang } from '@/hooks/useLang'

const props = withDefaults(defineProps(), {
  visible: false
});
const emit = defineEmits(['update:visible']);

const show = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val);
  }
});

const { setLang } = useLang();

const list = ref([
  {
    text: 'English'
  },
  {
    text: 'Das ist Deutsch'
  }
])

const onChangeLang = (lang) => {
  console.log('lang=', lang)
}

</script>
<style lang="scss" scoped></style>