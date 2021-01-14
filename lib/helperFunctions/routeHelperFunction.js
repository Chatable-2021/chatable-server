// const UserService = require('../services/UserService')

// const attachCookie = (res, user) => {
//     res.cookie('session', UserService.verifyAuthToken(user), {
//         httpOnly: true,
//         maxAge: 1000 * 60 * 24,
//         samSite: 'none',
//         secure: process.env.NODE_ENV === 'production'
//     });
// }

// module.exports = attachCookie;