import { url } from '~/static/dataApi'
export const oidcSettings = {
    authority: url,
    client_id: "TTDoc.UI",
    redirect_uri: "http://localhost:3000/callback",
    response_type: "code",
    scope: "TTDoc.UIAPI openid profile offline_access",
    post_logout_redirect_uri: "http://localhost:3000/",
    automaticSilentRenew: true,
    silentRequestTimeout: 100,
}