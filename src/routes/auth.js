import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const router = express.Router();

// Register route
async function readUsers() {
    try {
        const fileData = await fs.readFile(usersFilePath, 'utf-8');
        return JSON.parse(fileData);
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
    }
}

async function writeUsers(users) {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
}

// POST /api/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        const users = await readUsers();

        const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: uuid(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await writeUsers(users);

        const { password: _, ...safeUser } = newUser;

        res.status(201).json({ 
            message: 'User registered successfully.', 
            user: safeUser,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// POST /api/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const users = await readUsers();

        const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const { password: _, ...safeUser } = user;
        
        res.json({ 
            message: 'Login successful.', 
            user: safeUser,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// GET /api/users
router.get('/users', async (req, res) => {
    try {
        const users = await readUsers();

        const safeUsers = users.map(({ password, ...user }) => user);
        res.json(safeUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;