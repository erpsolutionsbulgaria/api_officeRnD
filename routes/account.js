const express = require('express')
const router = express.Router()
const UserCtrl = require('../controllers/user.controller')()
// const AuthCtrl = require('../controllers/auth.controller')()
// const isAuth = require('../middleware/is-auth.middleware')

// router.route('/login')
//     .post(TrimRequest.body, loginValidation, (req, res, next) => {
//         try {
//             req.body.ipV4 = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
//                 req.connection.remoteAddress ||
//                 req.socket.remoteAddress ||
//                 req.connection.socket.remoteAddress

//             next()
//         } catch (err) {
//             res.send(err.message)
//         }
//     }, AuthCtrl.authLocal)

router.route('/')
    .get(UserCtrl.getAll)

router.route('/create')
    .post(UserCtrl.createUser)

    module.exports = router