const router = require('express').Router()
const { ObjectId } = require('mongoose').Types
const Thought  = require('../../models/Thought')

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

    } catch (err) {
        res.status(500).json(err)
    }
})

// POST: create a new thought (make sure to push the created thought _id to associated user's thoughts array field)
router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body)

        res.status(200).json(thought)
    } catch (err) {
        res.status(500).json(err)
    }
})

// PUT: update a thought (by _id)
router.post('/:thoughtId', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE: delete a thought (by _id)
router.post('/:thoughtId', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err)
    }
})


// /api/thoughts/:thoughtId/reactions
// POST: create a reaction (stored in thought's reaction array)
router.post('/:thoughtId/reactions', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE: remove a reaction (by the reactionId)
router.delete('/:thoughtId/reactions', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router