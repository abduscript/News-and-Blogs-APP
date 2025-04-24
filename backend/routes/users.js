import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';


const router = express.Router();


// User registration
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah digunakan. Gunakan email lain.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// User login
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email dan password wajib diisi' });
//         }

//         const user = await User.findOne({ where: { email } });

//         if (!user) {
//             return res.status(400).json({ message: 'User tidak ditemukan' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ message: 'Password salah' });
//         }

//     } catch (err) {
//         res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
//     }
// });
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password wajib diisi' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'User tidak ditemukan' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Password salah' });
        }

        // ✅ Kirim response kalau sukses login
        res.status(200).json({
            message: 'Login berhasil',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
    }
});


// get user
// routes/userRoutes.js
router.get('/me', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email dibutuhkan' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.json({
        id: user.id,
        username: user.username,
        email: user.email
    });
});



export default router;