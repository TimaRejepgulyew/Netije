import Oidc, { WebStorageStateStore } from "oidc-client";
import oidc from '~/plugins/oidc-plugin'

export default function (context) {



    oidc.getUser().then(user => {

        console.log('middleware');
        if (user == null) {
            oidc.signinRedirect()
            console.log('middleware');
        } else {
            context.store.dispatch("profile-user/getUserName", user.profile.name)
        }

    })
}