
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


// Pagination

// GET /users endpoint with pagination
// http://localhost:3000/users-pagination?page=7&limit=3
app.get('/users-pagination', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page <= 0 || limit <= 0) {
        return res.status(400).json({ message: 'Invalid page or limit value' });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedUsers = mockData.slice(startIndex, endIndex);

    if (paginatedUsers.length === 0) {
        return res.status(404).json({ message: 'No users found for this page' });
    }

    res.json({
        page,
        limit,
        totalUsers: mockData.length,
        totalPages: Math.ceil(mockData.length / limit),
        users: paginatedUsers
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });