
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let mockData = require('./MOCK_DATA.json');

// GET all users
app.get('/users', (req, res) => {
    res.json(mockData);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
    const user = mockData.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});


// POST new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = mockData.length + 1;
    mockData.push(newUser);
    res.status(201).json(newUser);
});

// PUT (update) user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = mockData.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    mockData[index] = { ...mockData[index], ...req.body };
    res.json(mockData[index]);
});

// DELETE user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = mockData.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    const deletedUser = mockData.splice(index, 1);
    res.json(deletedUser[0]);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });