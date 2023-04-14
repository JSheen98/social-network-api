const { Schema, model } = require('mongoose')

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
            // Should (in theory) format the date to MM/DD/YYYY
            get: (date) => {
                `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
            }
        }
    }
)

module.exports = reactionSchema