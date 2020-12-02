import scanner from "~/infrastructure/hubs/scanner.js";
import notification from "~/infrastructure/hubs/notification.js";
import online from "~/infrastructure/hubs/userOnline.js";
export default ({ app }, inject) => {
  inject("notification", notification(app));
  inject("scanner", scanner(app));
  inject("online", online(app));
};
