import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import { oidcSettings } from '../config/oidc'
import { WebStorageStateStore } from 'oidc-client'
const storeModule = vuexOidcCreateStoreModule(

    {
        ...oidcSettings,
        userStore: new WebStorageStateStore({ store: window.localStorage }),

    },

    {
        namespaced: true,
        dispatchEventsOnWindow: true,
        publicRoutePaths: ['/callback']
    },
    // {
    //     userLoaded: (user) => { console.log('OIDC user is loaded:', user) },
    //     userUnloaded: () => console.log('OIDC user is unloaded'),
    //     accessTokenExpiring: () => console.log('Access token will expire'),
    //     accessTokenExpired: () => console.log('Access token did expire'),
    //     silentRenewError: () => console.log('OIDC user is unloaded'),
    //     userSignedOut: () => console.log('OIDC user is signed out')
    // }
)

export const state = () => (storeModule.state)

export const getters = storeModule.getters

export const actions = storeModule.actions

export const mutations = storeModule.mutations