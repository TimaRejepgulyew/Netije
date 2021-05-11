export default ({ app }, inject) => {
    let audio = new Audio();
    audio.src = "/notification.mp3";

    function allowNotification() {
        Notification.requestPermission();
    }

    function notify(body, id, context) {
        let options = {
            body: body,
            icon: "/favicon.ico"
        };
        audio.play();
        audio.currentTime = 0;
        let notification = new Notification(
            context.$t("notificationMessage"),
            options
        );
        notification.onclick = function() {
            app.$popup.assignmentCard(context, {
                params: { assignmentId: id }
            });
            window.focus();
        };
        // setTimeout(() => {
        //   notification.close();
        // }, 4000);
    }
    function message(ctx, message) {
        console.log(app, "message");
        let options = {
            body: message.text,
            icon: "/favicon.ico"
        };
        audio.play();
        audio.currentTime = 0;
        let notification = new Notification(message.author.name, options);
        notification.onclick = function() {
            // app.$popup.assignmentCard(context, {
            //     params: { assignmentId: id }
            // });
            // window.focus();
        };
    }
    inject("message", message);
    inject("notify", notify);
    inject("allowNotification", allowNotification);
};
