const router = require('express').Router();
const { where } = require('sequelize');
const { Post, User } = require('../../models');
const { findAll } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.Create({
            ...req.body,
            user_id: req.sessison.user_id,
        });

res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const newPost = await Post.update(
        {
        title: req.body.title,
        body: req.body.body,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id
          }
        });

res.status(200).json({ newPost, message: "Success"})
    } catch (err) {
        res.status(400).json({ err, message: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const PostData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.sessison.user_id,
            },
        });

if (!PostData) {
    res.status(404).json({ message: " No post found" });
    return;
}

res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

