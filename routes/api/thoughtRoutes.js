const router = require('express').Router()
const Thought  = require('../../models/Thought')
const User = require('../../models/User')

// /api/thoughts
// GET: get all thoughts
router.get('/', async (req, res) => {
    try {
        // Use .find() method to grab all thoughts
        const thoughts = await Thought.find()

        // Send 200 success status and put the variable in json format
        res.status(200).json(thoughts)
    } catch (err) {
        // If there is an error, catch it, display 500 server error
        res.status(500).json(err)
    }
})

// GET: get one thought (by _id)
router.get('/:thoughtId', async (req, res) => {
    try {
        // Use the .findOne() method and grab the id from URL params
        const thought = await Thought.findOne({ _id: req.params.thoughtId })  

        // Validation (if no thought with the ID exists, give message and return)
        if(!thought) {
            res.status(404).json({ message: 'That thought ID does not exist' })
            return
        }

        res.status(200).json(thought)
    } catch (err) {
        res.status(500).json(err)
    }
})

// POST: create a new thought (make sure to push the created thought _id to associated user's thoughts array field)
router.post('/', async (req, res) => {
    try {
        // Use the .create() method to make a new thought .then statement to ensure 
        // .create() finishes before we start the next part
        const thought = await Thought.create(req.body).then((newThought) => {
            // use the .findByIdAndUpdate() method to add the thought to the 
            // user's thoughts array
            return User.findOneAndUpdate(
                // Grab the username
                { username: req.body.username } ,
                // Push the new thought id into the user's thoughts array
                { $push: { thoughts: { _id: newThought._id } } },
                // Apply update and return new document
                { new: true }
            )
        })

        res.status(200).json({thought})
    } catch (err) {
        res.status(500).json(err)
    }
})

// PUT: update a thought (by _id)
router.put('/:thoughtId', async (req, res) => {
    try {
        // Find the thought we want to update by ID
        const thought = await Thought.findByIdAndUpdate(
            // Grab the thought ID
            { _id: req.params.thoughtId },
            // Set the changes from the json request body
            { $set: req.body },
            // Apply updaet and return new document
            { new: true }   
        )

        // Validation / error handling
        if(!thought) {
            res.status(404).json({ message: 'That thought ID does not exist' })
            return
        }

        // Give success status and success message with new json
        res.status(200).json({ thought, message: 'Thought updated successfully' })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE: delete a thought (by _id)
router.delete('/:thoughtId', async (req, res) => {
    try {
        // use the .findOneAndDelete() method, grab thought ID from URL params 
        // then statement to ensure next part waits until the first method completes
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId }).then(() => {
            // .findOneAndUpdate() method for the User of the created thought
            return User.findOneAndUpdate(
                // Grab the thought ID from URL params
                { thoughts: req.params.thoughtId } ,
                // Pull it from the thoughts array of the user
                { $pull: { thoughts: req.params.thoughtId } },
                // Return new document
                { new: true }
            )
        })

        // Validation
        if(!thought) {
            res.status(404).json({ message: 'That thought ID does not exist' })
            return
        }

        res.status(200).json({ message: 'Thought deleted successfully' })
    } catch (err) {
        res.status(500).json(err)
    }
})


// /api/thoughts/:thoughtId/reactions
// POST: create a reaction (stored in thought's reaction array)
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        // .findOneAndUpdate() method for adding a reaction to thoughts array
        const thought = await Thought.findOneAndUpdate(
            // Grab the ID of the thought to add to
            { _id: req.params.thoughtId },
            // Add the new reaction to the array with the given req.body
            { $addToSet: { reactions: req.body } },
            // Return updated document
            { new: true }
        )

        if(!thought) {
            res.status(404).json({ message: 'That thought ID does not exist' })
            return
        }

        res.status(200).json({ thought, message: 'Reaction added successfully!' })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE: remove a reaction (by the reactionId)
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        // .findOneAndUpdate() method to remove a reaction from thoughts array
        const thought = await Thought.findOneAndUpdate(
            // Grab ID of the thought we want to remove reaction from
            { _id: req.params.thoughtId },
            // Pull method to remove the reaction by id (from params) from array
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            // Return updated doc
            { new: true }
        )

        if(!thought) {
            res.status(404).json({ message: 'That thought ID does not exist' })
            return
        }

        res.status(200).json({ thought, message: 'Reaction deleted successfully!' })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router