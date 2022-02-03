// Models
const UsersModel = require('../models/user.model')()

// Error Handler
const errorhandler = require('../helpers/errorHandler')()

module.exports = function UserController () {
    async function getAll (req, res, next) {
        try {
            // const user = req.user
            // const users = await UsersModel.getAll(user.egtGroupMember)
            res.send('Ok')
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }

    async function createUser (req, res, next) {
        try {
            const adminUser = req.user
            await UsersModel.createUser(req.body)
            res.send({
                status: 1,
                message: 'Successfull created user'
            })
        } catch (err) {
            // logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }

    return {
        getAll,
        createUser
    }
}