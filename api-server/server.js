const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json());

const usersFilePath = path.join(__dirname, 'users.json');

// Helper function to read users data
const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

// Helper function to write users data
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// GET all users
app.get('/api/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

// GET a user by ID
app.get('/api/users/:id', (req, res) => {
    const users = readUsersFromFile();
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).send('User not found');
    }

    res.json(user);
});

// POST a new user
app.post('/api/users', (req, res) => {
    const users = readUsersFromFile();
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password // Include password field
    };

    // Validation to check if email already exists
    if (users.some(u => u.email === newUser.email)) {
        return res.status(400).send('Email already exists');
    }

    users.push(newUser);
    writeUsersToFile(users);
    res.status(201).json(newUser);
});

// PUT to update a user
app.put('/api/users/:id', (req, res) => {
    const users = readUsersFromFile();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }

    const updatedUser = {
        ...users[userIndex],
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password // Include password field
    };

    users[userIndex] = updatedUser;
    writeUsersToFile(users);
    res.json(updatedUser);
});

// DELETE a user
app.delete('/api/users/:id', (req, res) => {
    const users = readUsersFromFile();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }

    users.splice(userIndex, 1);
    writeUsersToFile(users);
    res.sendStatus(204);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
