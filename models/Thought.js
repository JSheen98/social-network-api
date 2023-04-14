const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')

// Schema for Thought model
thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
            }
        },
        username: {
            type: String,
            required: true,
        },
        // Subdocument is embedded
        reactions: [reactionSchema]
    }
)

const Thought = model('thought', thoughtSchema)

module.exports = Thought