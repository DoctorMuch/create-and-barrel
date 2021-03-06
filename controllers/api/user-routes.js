const router = require('express').Router();
const { User, Whiskey } = require('../../models');

router.get('/', (req, res) => {
  User.findAll({
    include: [
      {
        model: Whiskey,
        attributes: [
          'whiskey_name',
          'price',
          'created_at'
        ]
      }
    ]
  })
  .then(dbUserData => res.json(dbUserData))
  res.render('roster', dbUserData[0]) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData){
      res.status(404).json( {message: 'User not found.' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  User.create(req.body)
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  }) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    },
  })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(400).json({ message: 'That is not the email of a current member!' });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);
    if(!validPassword) {
      res.status(400).json({ message: 'Password is incorrect. Try again or sign up, if you are not a member.' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData.username, message: 'You are now logged in.' })
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]){
      res.status(404).json({ message: 'User not found!'})
      return;
    }
    res.json(dbUserData)})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.render('/login');
  }
})

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
