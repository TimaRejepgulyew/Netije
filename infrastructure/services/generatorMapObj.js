export default function({
  Constant,
  translateName,
  iconStores = false,
  context
}) {
  let obj = {};

  for (let item in Constant) {
    obj[Constant[item]] = {
      value: item,
      icon: iconStores ? iconStores[item] : false,
      text: context.$t(`${translateName}.${item}`)
    };
  }
  return obj;
}
