const router = require('express').Router();
const { response } = require('express');
const {User} = require('../models');

router.get('/api/users', (req, res) => {
  User.findAll()
  .then(dbUserData => res.json(dbUserData))
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
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  User.update(req.body,{
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]){
      res.status(404).json({ message: 'User not found!'})
      return;
    }
    res.json(dbUseData)})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })

  
});

router.delete('/:id', (req, res) => {});


module.exports = router;
