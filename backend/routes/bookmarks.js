import express from 'express';
import Bookmark from '../models/Bookmark.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, blogId } = req.body;
    const newBookmark = await Bookmark.create({ UserId: userId, BlogId: blogId });
    res.json(newBookmark);
});

router.get('/:userId', async (req, res) => {
    const bookmarks = await Bookmark.findAll({ where: { UserId: req.params.userId } });
    res.json(bookmarks);
});

router.delete('/:userId/:blogId', async (req, res) => {
    await Bookmark.destroy({ where: { UserId: req.params.userId, BlogId: req.params.blogId } });
    res.json({ message: 'Bookmark removed' });
});

export default router;
