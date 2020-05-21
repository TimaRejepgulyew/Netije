import { url } from '~/static/dataApi'
export const oidcSettings = {
    authority: url,
    client_id: "TTDoc.UI",
    redirect_uri: "https://netije.turkmen-tranzit.com/callback",
    response_type: "code",
    scope: "TTDoc.UIAPI openid profile offline_access",
    post_logout_redirect_uri: "https://netije.turkmen-tranzit.com/",
    automaticSilentRenew: true,
    silentRequestTimeout: 100,
}
