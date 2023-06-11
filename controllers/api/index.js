const rotuer = require('express').Router();
const userRouts = require('./userRoutes');
const PostRoutes = require('./postRoutes');

rotuer.use('/users', userRouts);
router.use('/express', postRouts);

module.exports = router;
