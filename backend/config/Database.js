import { Sequelize } from 'sequelize';

const db = new Sequelize('news_and_blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

export default db;