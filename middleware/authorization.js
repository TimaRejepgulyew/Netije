import oidc from '~/plugins/oidc-plugin'

export default function (context) {

    oidc.getUser().then(user => {
        if (user == null) {

            oidc.signinRedirect()

        } else {

            context.store.dispatch("profile-user/getUserName", user.profile.name)
            console.log(context.store.getters["profile-user/userName"])
        }

    })
}