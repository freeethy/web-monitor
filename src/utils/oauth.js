const host=`${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`
const oidcOptions = {
    authority: 'https://account-dev.icsoc.net',
    client_id: 'js-client',
    post_logout_redirect_uri: host+'/oauth',
    redirect_uri: host+'/oauth',
    silent_redirect_uri: host+'/oauth',
    accessTokenExpiringNotificationTime: 4,
    automaticSilentRenew: false,
    response_type: 'id_token token',
    scope: 'openid',
    filterProtocolClaims: true,
}

export default oidcOptions


// import { createUserManager } from 'redux-oidc';
// const host='http://bi.icsoc.net'
// const oidcOptions = {
//     authority: 'https://account-dev.icsoc.net',
//     client_id: 'js-client',
//     post_logout_redirect_uri: host,
//     redirect_uri: host,
//     silent_redirect_uri: host,
//     accessTokenExpiringNotificationTime: 4,
//     automaticSilentRenew: false,
//     response_type: 'id_token token',
//     scope: 'openid',
//     filterProtocolClaims: true
// }
// const userManager = createUserManager(oidcOptions)

// export default userManager
