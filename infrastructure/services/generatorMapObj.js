export default function ({
  Constant,
  translateName,
  iconStores = false,
  context,
  options
}) {
  let obj = {};

  for (let item in Constant) {
    obj[Constant[item]] = {
      id: Constant[item],
      value: item,
      icon: iconStores ? iconStores[item] : false,
      text: context.$t(`${translateName}.${item}`),
      ...options
    };
  }
  return obj;
}
