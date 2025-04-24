// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const {DataTypes} = Sequelize;

// const Bookmark = db.define('bookmarks',{
//     code: {
//         type: DataTypes.STRING,  // Menggunakan INTEGER untuk id
//         primaryKey: true,         // Menentukan id sebagai primary key
// //        autoIncrement: true        Membuat id otomatis bertambah
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false  // Menentukan kolom name tidak boleh kosong
//     }
// },{
//     freezeTableName:true
// });

// export default Bookmark;

// (async() => {
//     await db.sync();
// })();
import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import User from './User.js';
import Blog from './Blog.js';

const Bookmark = db.define('bookmarks', {
    // tidak perlu tambahan kolom selain relasi
});

// Bookmark menyambungkan User <-> Blog
Bookmark.belongsTo(User);
Bookmark.belongsTo(Blog);
User.hasMany(Bookmark);
Blog.hasMany(Bookmark);

export default Bookmark;
