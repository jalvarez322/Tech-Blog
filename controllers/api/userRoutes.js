const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const user = await User.Create(req.body);

        req.session.save(() => {
            req.session.user_id = userDatabase.id;
            req.sessison.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findAll({ where: { name: req.body.name } });

        if (!userData) {
            res.status(404).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
    

    const validPassword = await userData[0].checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    req.session.save(() => {
      
      req.session.user_id = userData[0].id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!', user_id : req.session.user_id });
    });

} catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        res.sessison.destory(() => {
            res.status(204).end();
        });

    } else {
        res.status(400).end();
    }
});

module.exports = router;