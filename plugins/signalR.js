import scanner from "~/infrastructure/hubs/scanner.js";
import notification from "~/infrastructure/hubs/notification.js";
export default ({ app }, inject) => {
  inject("notification", notification(app));
  inject("scanner", scanner(app));
};
