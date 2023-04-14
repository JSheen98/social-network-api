const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')
const moment = require('moment')

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
            get: () => new Date(date).getMonth()
        },
        username: {
            type: String,
            required: true,
        },
        // Subdocument is embedded
        reactions: [reactionSchema]
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    })

const Thought = model('thought', thoughtSchema)

module.exports = Thought