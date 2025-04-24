// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const {DataTypes} = Sequelize;

// const Blog = db.define('blogs',{
//     id: {
//         type: DataTypes.INTEGER,  // Menggunakan INTEGER untuk id
//         primaryKey: true,         // Menentukan id sebagai primary key
//         autoIncrement: true        // Membuat id otomatis bertambah
//     },
//     image: {
//         type: DataTypes.STRING,  // Menggunakan INTEGER untuk id
//         allowNull: true,         // Menentukan id sebagai primary key
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false  // Menentukan kolom name tidak boleh kosong
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false  // Menentukan kolom name tidak boleh kosong
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         defaultValue: Sequelize.NOW, // Set default value to current date and time
//     },
//     updatedAt: {
//         type: DataTypes.DATE,
//         defaultValue: Sequelize.NOW, // Set default value to current date and time
//     }
// },{
//     freezeTableName:true
// });

// export default Blog;

// (async() => {
//     await db.sync();
// })();
import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import User from './User.js';

const Blog = db.define('blogs', {
        id: {
            type: DataTypes.INTEGER,  // Menggunakan INTEGER untuk id
            primaryKey: true,         // Menentukan id sebagai primary key
            autoIncrement: true        // Membuat id otomatis bertambah
        },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT, // atau DataTypes.STRING kalau URL saja
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    underscored: true, // Menggunakan snake_case untuk nama kolom
});

// Relasi Blog milik 1 User
Blog.belongsTo(User);
User.hasMany(Blog);

export default Blog;
