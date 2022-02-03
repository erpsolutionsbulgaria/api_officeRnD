const UserSchema = require('../schemas/user')

module.exports = function UserModel () {
    async function getAll () {
        try {
            return await UserSchema.find({})
        } catch (err) {
            throw err
        }
    }

    async function createUser (userData) {
        try {
            // const randomToken = await crypto.randomBytes(64).toString('hex')
            // const existingUser = await find(userData)
            // if (!canUserAdminPerformActionToUser(adminUser.egtGroupMember, userData.egtGroupMember)) {
            //     throw new Unauthorized('Unauthorized request!')
            // }
            // if (existingUser) {
            //     const err = new Forbidden('Account with the same Email Address already exists')
            //     err.type = 'email'
            //     err.datetime = new Date()
            //     throw err
            // }

            console.log('>>>>>>>', userData)

            const user = new UserSchema(userData)
            const createdUser = await user.save()
            return createdUser
        } catch (err) {
            throw err
        }
    }

    return {
        getAll,
        createUser
    }
}
