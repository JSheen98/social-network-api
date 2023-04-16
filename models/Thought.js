const { Schema, model } = require('mongoose')
// Require subdocument schema from the given file
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
            // Use moment npm package for date formatting
            get: (date) => moment(date).format('LLL')
        },
        username: {
            type: String,
            required: true,
        },
        // Subdocument is embedded
        reactions: [reactionSchema]
    },
    {
        // virtuals to create virtual below
        // getters to make get method above (date formatting) work
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

// Use virtual to create reactionCount function
thoughtSchema
    .virtual('reactionCount')
    // Function to return the length of the reactions array
    .get(function() {
        return this.reactions.length
    })

const Thought = model('thought', thoughtSchema)

module.exports = Thought