const User = require('./User');
const post = require('./Posts');
const Comment = require('./Comment');

User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'Cascade',
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
  });

  User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'Cascade',
});

Comment.belongsTo(User, {
    foreignKey: 'post_id',
    onDelete: 'Cascade',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });

module.exports = { User, Posts };