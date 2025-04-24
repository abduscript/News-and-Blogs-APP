import express from 'express';
import Blog from '../models/Blog.js';
import upload from '../middleware/upload.js';


const router = express.Router();

// CREATE blog
router.post('/', upload.single('image'), async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log the request body to see what is being sent
        console.log("Tipe req.body:", typeof req.body);  // Harusnya: object
        console.log("Isi req.body:", req.body);
        const { title, content } = req.body;
        const image = req.file ? req.file.filename : '/src/assets/images/no-img.png'; // Use the path of the uploaded file
        const blog = await Blog.create({ 
            title, 
            content, 
            image 
        });
        res.status(201).json(blog);
        } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).json({ message: 'Failed to create blog' });
        }
    });
    
  // GET all blogs
    router.get('/', async (req, res) => {
        try {
        const blogs = await Blog.findAll();
        res.json(blogs);
        } catch (err) {
        res.status(500).json({ message: 'Failed to get blogs' });
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const updated = await Blog.update(req.body, { where: { id } });
            const updatedBlog = await Blog.findByPk(id);
            res.status(200).json(updatedBlog);
        } catch (err) {
            console.error("Error updating blog:", err);
            res.status(500).json({ error: 'Failed to update blog' });
        }
    });
    
    // delete blog by id
    router.delete('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            await Blog.destroy({ where: { id } });
            res.status(200).json({ message: 'Blog deleted successfully' });
        } catch (err) {
            console.error('Error deleting blog:', err);
            res.status(500).json({ error: 'Failed to delete blog' });
        }
    });
    

export default router;
