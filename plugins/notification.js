
export default ({ app }, inject) => {
  let audio = new Audio();
  audio.src = "/notification.mp3";

  function allowNotification() {
    Notification.requestPermission()
  }

  function notify(body, id, context) {
    let options = {
      body: body,
      icon: "/favicon.ico",
    };
    audio.play();
    audio.currentTime = 0;
    let notification = new Notification(context.$t('notificationMessage'), options);
    notification.onclick = function () {
      app.$popup.assignmentCard(context,
        {
          params: { assignmentId: id }
        }
      );
      window.focus()
    }
    // setTimeout(() => {
    //   notification.close();
    // }, 4000);
  }

  inject("notify", notify);
  inject("allowNotification", allowNotification);
}


