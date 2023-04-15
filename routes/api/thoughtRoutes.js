const router = require('express').Router()
const { ObjectId } = require('mongoose').Types
const Thought  = require('../../models/Thought')
const User = require('../../models/User')

// /api/thoughts
// GET: get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find()

        res.status(200).json(thoughts)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET: get one thought (by _id)
router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })  

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
        // const userId = new ObjectId(req.body._id)
        const thought = await Thought.create(req.body)//.then(() => {
        //     return User.findByIdAndUpdate(
        //         {_id: userId},
        //         { $set: req.body },
        //         { new: true }
        //     )
        // })

        res.status(200).json({thought})
    } catch (err) {
        res.status(500).json(err)
    }
})

// PUT: update a thought (by _id)
router.put('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }   
        )

        if(!thought) {
            res.status(404).json({ message: 'That thought ID does not exist' })
            return
        }

        res.status(200).json({ thought, message: 'Thought updated successfully'})
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE: delete a thought (by _id)
router.delete('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })

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
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )

        if(!thought) {
            res.status(404).json({ message: 'That thought ID does not exist' })
            return
        }

        res.status(200).json({ thought, message: 'Reaction added successfully!'})
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE: remove a reaction (by the reactionId)
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )

        if(!thought) {
            res.status(404).json({ message: 'That thought ID does not exist' })
            return
        }

        res.status(200).json({ thought, message: 'Reaction deleted successfully!'})
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router