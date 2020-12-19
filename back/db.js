const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIAL
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database', error);
    }
})()

const UserModel = require("./models/user")
const PostModel = require("./models/post")
const ComModel = require("./models/com")

const User = UserModel(sequelize, Sequelize)
const Post = PostModel(sequelize, Sequelize)
const Com = ComModel(sequelize, Sequelize)
Com.belongsTo(User)
Post.belongsTo(User)


sequelize.sync()
    .then(() => {
        console.log(`Database & tables created!`)
    });

(async () => {
    try {
        await User.findOrCreate({
            where: { email: "admin@admin.com" },
            defaults: {
                firstName: "Jonas", lastName: "Siry", email: "admin@admin.com", password: "$2b$10$Ug5uLcx6J12hkGP0k6G/KOean6bXLB3Yk9hS6/Xy5ybWetzB7sQwa"
            }
        })
    } catch (error) {
        console.error('Unable to create admin', error);
    }
})()

module.exports = { User, Post, Com }


// sync {force:true}