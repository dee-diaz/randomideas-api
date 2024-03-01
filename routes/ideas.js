const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// Get all ideas
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({ sucess: true, data: ideas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong'});
    }
});

// Get an idea
router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({ sucess: true, data: idea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong'});
    }

    res.json({ sucess: true, data: idea });
});

// Add an idea
router.post('/', async (req, res) => {
    const idea = new Idea ({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username
    });

    try {
        const savedIdea = await idea.save();
        res.json({ success: true, data: savedIdea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

// Update an idea
router.put('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        // Match the usernames
        if(idea.username === req.body.username) {
            const updatedIdea = await Idea.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: {
                        text: req.body.text,
                        tag: req.body.tag
                    }
                },
                { new: true }
            );
            return res.json({ success: true, data: updatedIdea });
        }

        // Usernames don't match
        res.status(403).json({ success: false, error: 'You are not authorized to update this resourse' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

// Delete an idea
router.delete('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        // Match the usernames
        if(idea.username === req.body.username) {
            await Idea.findByIdAndDelete(req.params.id);
            return res.json({ success: true, data: {} });
        }

        // Usernames don't match
        res.status(403).json({ success: false, error: 'You are not authorized to delete this resourse' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
})

module.exports = router;