const express = require('express');
const router = express.Router();

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
router.get('/', (req, res) => {
    res.json({ sucess: true, data: ideas });
});

// Get an idea
router.get('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if(!idea) {
        return res.status(404).json( { success: false, error: 'Resource not found' });
    }

    res.json({ sucess: true, data: idea });
});

// Add an idea
router.post('/', (req, res) => {
    const idea = {
        id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toISOString().slice(0, 10)
    }

    ideas.push(idea);

    res.json({ success: true, data: idea });
});

// Update an idea
router.put('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if(!idea) {
        return res.status(404).json( { success: false, error: 'Resource not found' });
    }

    idea.text = req.body.text || idea.text;
    idea.tag = req.body.tag || idea.tag;

    res.json({ sucess: true, data: idea });
});

// Delete an idea
router.delete('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if(!idea) {
        return res.status(404).json( { success: false, error: 'Resource not found' });
    }

    const index = ideas.indexOf(idea);

    ideas.splice(index, 1);

    res.json({ success: true, data: {} });
})

module.exports = router;