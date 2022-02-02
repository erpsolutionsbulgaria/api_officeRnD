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

    return {
        getAll
    }
}