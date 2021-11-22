const router = require('express').Router();
const { User, Whiskey } = require('../models');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  Whiskey.findAll({
    attributes: [
      'id',
      'whiskey_name',
      'price',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbWhiskeyData => {
    const whiskeys = dbWhiskeyData.map(whiskey => whiskey.get({ plain: true }));
    res.render('homepage', {
      whiskeys,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/dash', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  console.log(req.session);
  Whiskey.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'whiskey_name',
      'price',
      'created_at'
    ],
    include: {
      model: User,
      attributes: ['username']
    }
  })
  .then(dbWhiskeyData => {
    console.log(dbWhiskeyData);
    const whiskeys = dbWhiskeyData.map(whiskey => whiskey.get({ plain: true }));
    res.render('dash', {
      user_id: req.session.user_id, 
      username: req.session.username,
      whiskeys,
      loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/users', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  User.findAll({
    include: {
      model: Whiskey,
      attributes: ['whiskey_name', 'price', 'created_at']
    }
  })
  .then(dbUserData => {
    const users = dbUserData.map(user => user.get({ plain: true }));
    res.render('roster', { users });
  })
})

module.exports = router;