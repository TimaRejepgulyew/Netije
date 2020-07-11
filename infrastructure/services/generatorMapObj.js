export default function({
  Constant,
  translateName,
  iconStores = false,
  context
}) {
  console.log(context);
  let obj = {};
  for (let item in Constant) {
    obj[Constant[item]] = {
      icon: iconStores ? iconStores[item] : false,
      text: context.$t(`${translateName}.${item}`)
    };
  }
  return obj;
}
