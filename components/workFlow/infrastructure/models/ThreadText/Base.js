import moment from "moment";
export default class {
  static formatDate(date) {
    return moment(date).format("DD.MM.YYYY HH:mm");
  }
}
