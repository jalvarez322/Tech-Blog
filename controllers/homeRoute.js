const router = require('express').Router();
const { User, Post } = require('../models');
const { findByPk } = require('../models/posts');
const withAuth = require('../middleware/auth');



router.get('/', async (req, res) => {
    try {
    let postData = await Post.findAll({
    include: [User]
    });
    console.log(req.session.user_id)

if (!postData) {
    res.status(404).json(postData);
    return;
}

let posts = postData.map((post) => post.get({plain: true}))

res.render('homepage', {
    posts,
    logged_in: req.session.user_id,
});
} catch (err) {
        res.status(404).json(err);
    }
    });

router.get('/login', async (req, res) => {
    try {
        res.render('login', {
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(404).json(err);
    }
});

router.post ('/signup', async (req, res) => {
    try {
        res.render('signup', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get ('/dashboard', withAuth, async (req, res) => {
    try {
     let postData = await Post.findAll({
        include: [User],
        where : {
            user_id: req.session.user_id,
        }
    })

let posts= postData.map((post) => post.get ({ plain: true }))
res.render('dashboard', {
    posts,
    logged_in: req.session.log,
    user_id: req.session.user_id
});
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/edit-post', withAuth, async (req, res) => {
    try {
        let postData = await Post.findOne({
            include: [User],
            where : {
                user_id: req.session.user,
                id : req.params.id
            }
        })
if (!postData){
    res.redirect('/')
    return;
}

let post = postData.get({ plain: true })
res.render('edit-post', {post});

    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/new-post', withAuth, async (req, res) => {
    res.render('new-post');
});

module.exports = router