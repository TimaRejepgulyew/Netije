import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
const Status = {
  Active: 0,
  Closed: 1
}
export default Status;
export function baseStatusModel(context) {
  return generatorMapObj({
    Constant: Status,
    translateName: "status",
    context: context,

  });
}