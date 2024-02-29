const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

const ideas = [
    {
        id: 1,
        text: 'AI for personalized health plans',
        tag: 'Technology',
        username: 'TechGuru',
        date: '2024-02-10'
    },
    {
        id: 2,
        text: 'Renewable energy crowdfunding platform',
        tag: 'Innovation',
        username: 'GreenTechie',
        date: '2024-02-05'
    },
    {
        id: 3,
        text: 'Global online debate forum',
        tag: 'Social',
        username: 'DebateMaster',
        date: '2024-01-30'
    },
    {
        id: 4,
        text: 'Crowdsourced urban planning app',
        tag: 'Technology',
        username: 'TechGuru',
        date: '2024-01-18'
    },
    {
        id: 5,
        text: 'Virtual reality learning spaces',
        tag: 'Education',
        username: 'EduInnovator',
        date: '2024-01-25'
    },
]

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
        res.json({ success: true, data: updatedIdea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

// Delete an idea
router.delete('/:id', async (req, res) => {
    try {
        await Idea.findByIdAndDelete(req.params.id);
        res.json({ success: true, data: {} });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
})

module.exports = router;