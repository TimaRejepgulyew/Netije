import moment from "moment";
export default class BaseThreadText {
  constructor(context) {
    this._instance = context;
  }
  formatDate(date) {
    return moment(date).format("DD.MM.YYYY HH:mm");
  }
}
