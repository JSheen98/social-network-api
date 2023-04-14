const router = require('express').Router()
const { ObjectId } = require('mongoose').Types
const User  = require('../../models/User')
const Thought  = require('../../models/User')

// /api/users
// GET: Get all users using the .find() method
router.get('/', async (req, res) => {
    try {
        const users = await User.find()

        // Give 200 status, show user data in JSON format
        res.status(200).json(users)
    } catch (err) {
        // If there is error, catch it, and give 500 status, show JSON err
        res.status(500).json(err)
    }
})

// GET: Get one user using the .findOne() method which requires the user's id
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })

        // If there is no user that matches the id, give 404 status and json 
        // message, return
        if (!user) {
            res.status(404).json({ message: 'That user ID does not exist'})
            return
        }

        // If there is a user with the ID, give the 200 status, and show the 
        // user in JSON
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

// POST: Create a new user using the .create() method
router.post('/', async (req, res) => {
    try {
        // Uses the info given from request body to create (i.e. username/email)
        const user = await User.create(req.body)
        
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

// PUT: Update a user (by _id) using the .findOneAndUpdate() method
router.put('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            // Take in the user ID of the user we want to update
            { _id: req.params.userId },
            // Set the new attributes based off given req body
            { $set: req.body },
            // Returns document AFTER update is applied
            { new: true }
        )

        if (!user) {
           res.status(404).json({ message: 'That user ID does not exist'})
           return
        }

        // Give 200 status and JSON success message
        res.status(200).json({ user, message: 'User updated successfully' })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE: Delete a user (by _id) using the .findOneAndDelete() method
router.delete('/:userId', async (req, res) => {
    try {
        // Takes the user ID we want to delete through URL params
        const user = await User.findOneAndDelete({ _id: req.params.userId })

        if (!user) {
            res.status(404).json({ message: 'That user ID does not exist'})
            return
        }

        // Give 200 status + JSON deletion success message
        res.status(200).json({message: 'User deleted successfully'})
    } catch (err) {
        res.status(500).json(err)
    }
})



// /api/users/:userId/friends/:friendId
// POST: Add a friend (by _id) using the .findOneAndUpdate() method
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            // Takes in the current user id through URL params
            {_id: req.params.userId},
            // Adds the friendId through params to the 'friends' set
            // which is a part of the User model
            {$addToSet: { friends: req.params.friendId}},
            // Returns document after update is applied
            {new: true}
        )

        if (!user) {
            res.status(404).json({ message: 'That user ID does not exist'})
            return
        }

        // Give 200 status + JSON friend added success message
        res.status(200).json({user, message: 'Friend added successfully!'})
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE: Remove a friend (by _id) using the .findOneAndUpdate() method
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            // Takes in the current user id through URL params
            {_id: req.params.userId},
            // Removes the friend's ID from the friends set on
            // the User model using the $pull operator
            {$pull: { friends: req.params.friendId } },
            // Applies changes to doc (essentially refreshes it)
            {new: true}
        )

        if (!user) {
            res.status(404).json({ message: 'That user ID does not exist'})
            return
        }

        // Give 200 status + JSON friend removed success message
        res.status(200).json({message: 'Friend removed successfully'})
    } catch (err) {
        res.status(500).json(err)
    }   
})

module.exports = router