const express = require('express');
const port = 5001;

const app = express();

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
    }
]

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the RandomIdeas API' });
});

// Get all ideas
app.get('/api/ideas', (req, res) => {
    res.json({ sucess: true, data: ideas });
});

// Get an idea
app.get('/api/ideas/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if(!idea) {
        return res.status(404).json( { success: false, error: 'Resource not found' });
    }

    res.json({ sucess: true, data: idea });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));