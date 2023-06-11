const { Model, DateTypes } = require('sequelizer');
const sequelize = require('../config/connections');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
         },
         date_created: {
            type: DateTypes.DATE,
            allowNull: false,
            defaultValue: DateTypes.NOW
         },
         user_id: {
            type: DataTypes.INTEGER,
            references: {
                model:'user',
                key:'id',
            },
         },
        },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
        );

module.exports = Post;