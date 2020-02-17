import Oidc, { WebStorageStateStore } from "oidc-client";
const config = {
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    authority: "http://192.168.4.99",
    client_id: "TTDoc.UI",
    redirect_uri: "http://localhost:57331/callback",
    response_type: "code",
    scope: "TTDoc.UIAPI openid profile offline_access",
    post_logout_redirect_uri: "http://localhost:57331/"
};

export default new Oidc.UserManager(config);
