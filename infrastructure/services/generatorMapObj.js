export default function(Constant, translateName, context, iconStores) {
  let obj = {};
  for (let status in Constant) {
    obj[Constant[status]] = {
      icon: iconStores[status],
      text: context.$t(`${translateName}.${status}`)
    };
  }
  return obj;
}
