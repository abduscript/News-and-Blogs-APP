// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const {DataTypes} = Sequelize;

// const User = db.define('users',{
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// },{
//     freezeTableName:true
// });

// export default User;

// (async() => {
//     await db.sync();
// })();
import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,  // Menggunakan INTEGER untuk id
        primaryKey: true,         // Menentukan id sebagai primary key
        autoIncrement: true        // Membuat id otomatis bertambah
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default User;
