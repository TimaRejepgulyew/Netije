import moment from "moment";
export default class BaseThreadText {
  constructor(context) {
    BaseThreadText._instance;
  }
   formatDate(date) {
    return moment(date).format("DD.MM.YYYY HH:mm");
  }
}
