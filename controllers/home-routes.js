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
      whiskeys
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

module.exports = router;