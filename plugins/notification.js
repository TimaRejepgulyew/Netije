
export default ({ app }, inject) => {
  let audio = new Audio();
  audio.src = "/notification.mp3";

  function allowNotification() {
    Notification.requestPermission()
  }

  function notify(title, body, params) {
    let options = {
      body: body,
      icon: "/favicon.ico",
    };
    audio.play();
    audio.currentTime = 0;
    let notification = new Notification(title, options);
    notification.onclick = function () {
      // app.$popup.
      console.log(notification);
      app.$popup.assignmentCard(this,
        // {
        // params: { assignmentId: params.id }
        // }
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


