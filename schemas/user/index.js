const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const { conn } = require('../../boot/mongo')

const { autoIncrement } = require('mongoose-plugin-autoinc')
// const UCASCrypt = require('../../helpers/passport/crypto')
// const logger = require('../../utils/loggers/common.logger')

// User Schema
const UserSchema = new Schema({
    uId: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
})

// encrypt the password && 2FA secret and make it unreadable
UserSchema.pre('save', async function () {
    try {
        const user = this

        if (this.isModified('password') || this.isNew) {
            if (user.password !== undefined) {
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
            }
        }
    } catch (err) {
        logger.error(`Error on user.save.pre.hook: ${err}`)
    }
})

UserSchema.plugin(autoIncrement, { model: 'User', field: 'uId' })

// // Pre operation
// UserSchema.pre('findOneAndUpdate', function (next) {
//     this.options.runValidators = true
//     const user = this._update
//     if (user.phone === undefined) {
//         next()
//     }
//     user.phone = user.phone.replace(/-/g, '').replace(/\s/g, '').replace('+', '00')
//     next()
// })

// Static function used to automatically generate passwords
UserSchema.statics.generateRandomPassword = function () {
    const randomPassword = Math.random().toString(36).slice(-8)
    return randomPassword
}

// method which can be used in the whole application where
// we want to compare two password (e.g. compare old and new passwords or
// compare if the incoming password from the front-end is correct and the
// user can be successfully authenticated)
UserSchema.methods.comparePassword = async function (candidatePassword, cb) {
    try {
        if (!candidatePassword || !this.password) {
            return false
        }
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = conn.model('User', UserSchema)