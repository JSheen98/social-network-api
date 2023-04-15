const { Schema, Types } = require('mongoose')
const moment = require('moment')

// Schema for Reaction model (embedded in the thoughtSchema)
reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use moment npm package for date formatting
            get: (date) => moment(date).format('LLL')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

module.exports = reactionSchema