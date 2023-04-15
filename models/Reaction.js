const { Schema, Types } = require('mongoose')

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
            type: String,
            default: Date.now
        }
    }
)

module.exports = reactionSchema