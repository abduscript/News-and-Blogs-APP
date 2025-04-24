import React, { useEffect, useState } from 'react'
import News from './Components/News.jsx'
import Blogs from './Components/Blogs.jsx'
import axios from 'axios'

const MainApp = () => {
    const [showNews, setShowNews] = useState(true);
    const [showBlogs, setShowBlogs] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
    const fetchBlogs = async () => {
        try {
            const res = await axios.get('/api/blogs');
            setBlogs(res.data);
        } catch (err) {
            console.error('Error fetching blogs:', err);
        }
    };
    fetchBlogs();
    }, []);

    const handleCreateBlog = async (newBlog, isEdit) => {
    try {
        let updatedBlogs;
        if (isEdit && selectedPost) {
            const res = await axios.put(`/api/blogs/${selectedPost.id}`, newBlog);
            const updated = res.data;
            updatedBlogs = blogs.map(blog => blog.id === selectedPost.id ? updated : blog);
        } else {
            const res = await axios.post('/api/blogs', newBlog);
            const created = res.data;
            updatedBlogs = [...blogs, created];
        }

        setBlogs(updatedBlogs);
        setIsEditing(false);
        setSelectedPost(null);
    } catch (err) {
        console.error('Error creating/updating blog:', err);
    }
    };

    const handleEditBlog = (blog) => {
        setSelectedPost(blog);
        setIsEditing(true);
        setShowNews(false);
        setShowBlogs(true);
    }

    const handleDeleteBlog = async (id) => {
        try {
            await axios.delete(`/api/blogs/${id}`);
            setBlogs(prev => prev.filter(blog => blog.id !== id));
        } catch (err) {
            console.error("Error deleting blog:", err);
        }
    };

    const handleShowBlogs = () => {
        setShowNews(false);
        setShowBlogs(true);
    }

    const handleBackToNews = () => {
        setShowNews(true);
        setShowBlogs(false);
        setIsEditing(false);
        setSelectedPost(null);
    }
    return (
        <div className='container'>
            <div className="news-blogs-app">
                {showNews && 
                <News 
                onShowBlogs={handleShowBlogs} 
                blogs={blogs} 
                onEditBlog={handleEditBlog}
                onDeleteBlog={handleDeleteBlog}
                />}
                {showBlogs && 
                <Blogs 
                onBack={handleBackToNews} 
                onCreateBlog={handleCreateBlog} 
                editPost={selectedPost} 
                isEditing={isEditing}
                />}
            </div>
        </div>
    )
}

export default MainApp