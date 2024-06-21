import { getDicts } from '@/api/modules/data';

/**
 * 获取字典数据
 */
export const useDict = (...args) => {
  const res = ref({});
  return (() => {
    args.forEach(async (dictType) => {
      res.value[dictType] = [];
      const dicts = useDictStore().getDict(dictType);
      if (dicts) {
        res.value[dictType] = dicts;
      } else {
        await getDicts(dictType).then((resp) => {
          res.value[dictType] = resp.data.map(
            (p) => ({
              label: p.dictLabel,
              value: p.dictValue,
              elTagType: p.listClass,
              elTagClass: p.cssClass
            })
          );
        });
      }
    });
    return res.value;
  })();
};
