import db from './config/Database.js';
import express from 'express';
import blogRoutes from './routes/blogs.js';
import bookmarkRoutes from './routes/bookmarks.js';
import userRoutes from './routes/users.js';
import { createServer } from 'http';
import cors from 'cors';

const app = express();
const server = createServer(app);
const port = 1457;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use('/uploads', express.static('uploads'));
app.use('/api/blogs', blogRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/auth', userRoutes);


// Sync database
db.sync({ alter: true })
    .then(() => console.log("Database synced with Sequelize (altered)"))
    .catch((err) => console.error("Error syncing database:", err));


// server running
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:1457`);
});
