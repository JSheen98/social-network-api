const { Schema, model } = require('mongoose')

// Schema for the User model 
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // Use regex email layout to make sure user email matches the pattern
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must be a valid email address'],         
        },
        // References the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // References itself (as friends will also be in the User model)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        // virtuals to create virtual below
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

// Virtual functional call 'friendCount' that returns the length of the friend array 
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    })

const User = model('user', userSchema)

module.exports = User