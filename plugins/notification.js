
export default ({ app }, inject) => {
  let audio = new Audio();
  audio.src = "/notification.wav";

  function allowNotification() {
    Notification.requestPermission()
  }

  function notify(title, body) {
    let options = {
      body: body,
      icon: "/favicon.ico",
    };
    audio.play();
    audio.currentTime = 0;
    let notification = new Notification(title, options);
    setTimeout(() => {
      notification.close();
    }, 3000);
  }

  inject("notify", notify);
  inject("allowNotification", allowNotification);
}


