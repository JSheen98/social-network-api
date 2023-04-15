const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')
const moment = require('moment')

// Schema for Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => moment(date).format('m/DD/YYYY')
        },
        username: {
            type: String,
            required: true,
        },
        // Subdocument is embedded
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    })

const Thought = model('thought', thoughtSchema)

module.exports = Thought