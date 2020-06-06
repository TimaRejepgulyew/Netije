import { url } from '~/static/dataApi'
export const oidcSettings = {
    authority: process.env.baseUrl,
    client_id: "TTDoc.UI",
    redirect_uri: `${process.env.uiAddr}/callback`,
    response_type: "code",
    scope: "TTDoc.UIAPI openid profile offline_access",
    post_logout_redirect_uri: `${process.env.uiAddr}/`,
    automaticSilentRenew: true,
    silentRequestTimeout: 100,
}
